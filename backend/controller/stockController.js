const axios = require('axios');
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const User = require("../model/user/userModel")



const searchStocks = async(req,res) => {
    const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
    try {
        const response = await axios.get(
      `https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`
    );
    
    if (!response.data?.result || !Array.isArray(response.data.result)) {
      return res.status(502).json({ error: 'Invalid response from Finnhub' });
    }
    res.json(response.data.result);
    } catch (error) {
        console.error('Search error:', error.message);
    res.status(500).json({ error: 'Stock search failed', details: error.message });
    }
}

const getWatchlist = async(req,res) => {
  
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({ watchlist: user.watchlist }); 
  } catch (error) {
    console.error("Watchlist fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch watchlist" });
  }
}


const addSymbol = async(req,res) => {
  const { symbol } = req.body;
  if (!symbol) {
    return res.status(400).json({ message: "Symbol is required" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     if (!user.watchlist.includes(symbol)) {
      user.watchlist.push(symbol);
      await user.save();
    }
    res.json({ watchlist: user.watchlist });

  } catch (error) {
     console.error("Error adding symbol:", error.message);
    res.status(500).json({ message: "Failed to add symbol", error: error.message });
  }
}

const deleteSymbol = async(req,res) => {
  const { symbol } = req.params;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.watchlist = user.watchlist.filter(s => s !== symbol);
    await user.save();

    res.json({ watchlist: user.watchlist });
  } catch (error) {
    console.error("Watchlist delete error:", error.message);
    res.status(500).json({ message: "Failed to delete symbol" });
  }
  
}


module.exports = {
  searchStocks,
  getWatchlist,
  addSymbol,
  deleteSymbol
}