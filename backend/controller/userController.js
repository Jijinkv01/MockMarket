const User = require("../model/user/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const DemoCash = require("../model/user/demoCashSchema")
const RefreshToken = require("../model/user/RefreshTokenScheme")
const Order = require("../model/user/orderSchema")
const Holding = require("../model/user/holdingSchema ")
const { v4: uuidv4 } = require('uuid');





const saveRefreshToken = async (userId, refreshToken) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await RefreshToken.findOneAndUpdate(
        { userId },
        { refreshToken, expiresAt },
        { upsert: true, new: true }
    );
};


const register = async (req, res) => {
    const { email, password } = req.body
    console.log("hahahaha", req.body)
    try {
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ success: false, message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword })


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });

        await saveRefreshToken(user._id, refreshToken);


        res.cookie("token", token, {
            httpOnly: true,       // 👈 this protects it from JS access (XSS)
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "Lax",   // CSRF protection
            maxAge: 15 * 60 * 1000, // 15 mins
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        await DemoCash.create({ userId: user._id });
        res.status(201).json({ success: true, message: "User Registered Successfully", user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error("Register Error:", error)
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

const logout = async (req, res) => {

    try {
        // Remove refresh token from DB if stored
        await RefreshToken.deleteOne({ userId: req.user.id }); // optional

        //  Clear the refresh token cookie
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
        });
        // Clear the refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });

        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Logout failed" });
    }
}

const refresh = async (req, res) => {
    const tokenFromCookie = req.cookies.refreshToken;

    if (!tokenFromCookie) {
        return res.status(401).json({ success: false, message: "No refresh token provided" });
    }
    try {
        const decoded = jwt.verify(tokenFromCookie, process.env.JWT_REFRESH_SECRET);
        const tokenDoc = await RefreshToken.findOne({ userId: decoded.id });

        if (!tokenDoc || tokenDoc.refreshToken !== tokenFromCookie) {
            return res.status(403).json({ success: false, message: "Invalid refresh token" });
        }

        const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.status(200).json({ success: true, message: "Access token refreshed" });
    } catch (error) {
        console.error("Refresh error:", error);
        return res.status(403).json({ success: false, message: "Refresh token expired or invalid" });
    }
}

const home = async (req, res) => {
    // console.log("Cookies:", req.cookies);
    const user = await User.findById(req.user.id).select("-password");
    // console.log("user kitti hahaha", user)
    if (!user) return res.status(401).json({ message: "User not found" });
    res.status(200).json({ user });
}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log("req.body....", req.body)
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect Password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });

        await saveRefreshToken(user._id, refreshToken);

        res.cookie("token", token, {
            httpOnly: true,       // 👈 this protects it from JS access (XSS)
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "Lax",   // CSRF protection
            maxAge: 15 * 60 * 1000, // 15 mins
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });


        res.status(200).json({ success: true, message: "Login Successfull", user: { id: user._id, email: user.email } })

    } catch (error) {
        console.error("login error", error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const getUserBalance = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("userid for fetching balance hahahaha")
        const cash = await DemoCash.findOne({ userId });

        if (!cash) return res.status(404).json({ message: "No balance found" });

        res.status(200).json({ balance: cash.balance });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch balance" });
    }
}

const placeOrder = async (req, res) => {
    console.log("hai i am going to place order")
    try {
        const userId = req.user.id;
        const { symbol, price, quantity, orderType, totalAmount, orderSide } = req.body;
        // console.log("req.body ", req.body)

        if (!symbol || typeof symbol !== "string") {
            return res.status(400).json({ success: false, message: "Symbol is required and must be a string" });
        }

        if (!orderType || !["market", "limit"].includes(orderType)) {
            return res.status(400).json({ success: false, message: "Order type must be 'market' or 'limit'" });
        }

        if (!orderSide || !["buy", "sell"].includes(orderSide)) {
            return res.status(400).json({ success: false, message: "Order side must be 'buy' or 'sell'" });
        }

        if (typeof quantity !== "number" || quantity <= 0 || !quantity) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive number" });
        }
        if (!price) {
            return res.status(400).json({ success: false, message: "enter the limit price" })
        }

        const demoBalance = await DemoCash.findOne({ userId });

        if (orderSide === "buy") {
            if (demoBalance.balance < totalAmount) {
                return res.status(400).json({ success: false, message: "Insufficient balance" });
            }

            // Deduct balance
            demoBalance.balance -= totalAmount;
            await demoBalance.save();
        }

        const orderId = uuidv4();
        // ✅ Save to DB
        const newOrder = await Order.create({
            userId: userId,
            symbol,
            price,
            quantity,
            orderType,
            orderSide,
            totalAmount,
            orderId,
            status: orderType === "market" ? "executed" : "pending",
        });

        // ✅ Track Holdings
        const existingHolding = await Holding.findOne({ userId, symbol });

        if (orderSide === "buy") {
            if (existingHolding) {
                // Update quantity and avgPrice (weighted average)
                const newTotalCost = existingHolding.quantity * existingHolding.avgPrice + quantity * price;
                const newQuantity = existingHolding.quantity + quantity;
                existingHolding.avgPrice = newTotalCost / newQuantity;
                existingHolding.quantity = newQuantity;
                await existingHolding.save();
            } else {
                // Create new holding
                await Holding.create({
                    userId,
                    symbol,
                    quantity,
                    avgPrice: price
                });
            }
        } else if (orderSide === "sell") {
            if (!existingHolding || existingHolding.quantity < quantity) {
                return res.status(400).json({ message: "Not enough quantity to sell" });
            }
            existingHolding.quantity -= quantity;
            if (existingHolding.quantity === 0) {
                await Holding.deleteOne({ _id: existingHolding._id });
            } else {
                await existingHolding.save();
            }
            // Add money to demo balance
            demoBalance.balance += totalAmount;
            await demoBalance.save();
        }

        res.status(201).json({ success: true, message: "Order placed successfully", newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
}

const getPendingOrders = async (req, res) => {
  const userId = req.user.id
    try {
        const orders = await Order.find({userId, orderType: "limit", status: "pending" }).sort({createdAt:-1});
        // console.log("orders",orders)
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

const cancelPendingOrder = async (req, res) => {
    try {
        const {orderId} = req.params
        const order = await Order.findOne({ _id: orderId, status: "pending", orderType: "limit" });

    if (!order) {
      return res.status(404).json({ message: "Pending limit order not found" });
    }

    // Update the status to "cancelled"
    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
        
    } catch (error) {
        console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Server error while cancelling order" });
    }
}

const getExecutedOrders = async (req, res) => {
    const userId = req.user.id
    try {
        const orders = await Order.find({userId, status: "executed" }).sort({createdAt:-1});
        console.log("orders",orders)
        res.json(orders);
    } catch (error) {
         console.error(error);
        res.status(500).json({ error: "Server error" });
    }

}
module.exports = {
    register,
    logout,
    home,
    login,
    getUserBalance,
    refresh,
    placeOrder,
    getPendingOrders,
    cancelPendingOrder,
    getExecutedOrders


}