const axios = require('axios');
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;



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




module.exports = {searchStocks}