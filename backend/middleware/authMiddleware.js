const jwt = require("jsonwebtoken");
const User = require("../model/user/userModel")

const protect = async(req, res, next) => {
  const token = req.cookies.token;
  console.log("token kooooo",token)
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    


    console.log("decoded",decoded)
    req.user = decoded;
    console.log("req.user",req.user)
    next();
  } catch (err) {
    console.log(err,"Invalid token")
    return res.status(401).json({ message: "Invalid token" });
  }
};







module.exports = protect;
