const express = require("express")
const router = express.Router()
const StockController = require("../controller/stockController")


router.get("/search",StockController.searchStocks)





module.exports = router

