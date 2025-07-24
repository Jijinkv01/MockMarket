const express = require("express")
const router = express.Router()
const UserController = require("../controller/userController")
const protect = require("../middleware/authMiddleware")


router.post("/register",UserController.register)

router.get("/refresh",UserController.refresh)
router.post("/logout",protect,UserController.logout)
router.get("/home",protect,UserController.home)
router.post("/login",UserController.login)
router.get("/balance",protect, UserController.getUserBalance)
router.post("/placeOrder",protect,UserController.placeOrder)
router.get("/getPendingOrders",protect,UserController.getPendingOrders)
router.put("/cancelPendingOrder/:orderId",protect,UserController.cancelPendingOrder)
router.get("/getExecutedOrders",protect,UserController.getExecutedOrders)
router.get("/getHoldings",protect,UserController.getHoldings)




module.exports = router

