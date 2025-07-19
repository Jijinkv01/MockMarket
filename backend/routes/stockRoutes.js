const express = require("express")
const router = express.Router()
const StockController = require("../controller/stockController")
const Protect = require("../middleware/authMiddleware")


router.get("/search",Protect, StockController.searchStocks)
router.get("/watchlist",Protect, StockController.getWatchlist)
router.post("/watchlist",Protect, StockController.addSymbol)
router.delete("/watchlist/:symbol",StockController.deleteSymbol )





module.exports = router

