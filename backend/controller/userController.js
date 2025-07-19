const User = require("../model/user/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const DemoCash = require("../model/user/demoCashSchema")




const register = async (req, res) => {
    const { email, password } = req.body
    console.log("hahahaha", req.body)
    try {
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ success: false, message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        

        res.cookie("token", token, {
            httpOnly: true,       // 👈 this protects it from JS access (XSS)
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "Lax",   // CSRF protection
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
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
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

        res.cookie("token", token, {
            httpOnly: true,       // 👈 this protects it from JS access (XSS)
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "Lax",   // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ success: true, message: "Login Successfull", user: { id: user._id, email: user.email } })

    } catch (error) {
        console.error("login error", error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const getUserBalance = async (req,res) => {
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


module.exports = {
    register,
    logout,
    home,
    login,
    getUserBalance


}