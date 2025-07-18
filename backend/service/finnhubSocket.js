const WebSocket = require('ws');
const axios = require('axios');
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

const finnhubSocket = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`);
const previousCloses = {};

function initSocketIO(io) {
  finnhubSocket.on('open', () => {
    console.log('✅ Finnhub WebSocket connected');
  });

  finnhubSocket.on('message', (data) => {
    const parsed = JSON.parse(data);
    if (parsed.type === 'trade') {
      parsed.data.forEach((trade) => {
        const symbol = trade.s;
        const currentPrice = trade.p;
        const prevClose = previousCloses[symbol];
        let d = null, dp = null;

        if (prevClose) {
          d = (currentPrice - prevClose).toFixed(2);
          dp = ((d / prevClose) * 100).toFixed(2);
        }

        io.emit('stockUpdate', {
          symbol,
          data: { c: currentPrice, d, dp }
        });
      });
    }
  });

  io.on('connection', (socket) => {
    console.log('📡 Client connected');

    socket.on('subscribe', async (symbol) => {
      console.log(`➡️ Subscribing to ${symbol}`);
      finnhubSocket.send(JSON.stringify({ type: 'subscribe', symbol }));

      try {
        const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
        previousCloses[symbol] = res.data.pc;

        socket.emit('stockUpdate', {
          symbol,
          data: { c: res.data.c, d: res.data.d, dp: res.data.dp }
        });
      } catch (err) {
        console.error(`❌ Error fetching initial data for ${symbol}:`, err.message);
      }
    });

    socket.on('unsubscribe', (symbol) => {
      console.log(`❌ Unsubscribing from ${symbol}`);
      finnhubSocket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    });

    socket.on('disconnect', () => {
      console.log('❎ Client disconnected');
    });
  });
}




module.exports = initSocketIO