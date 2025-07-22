import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    watchlist: [],
    stockData: {},
  },
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    addToWatchlist: (state, action) => {
      if (!state.watchlist.includes(action.payload)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(symbol => symbol !== action.payload);
    },
    updateStockData: (state, action) => {
      const { symbol, data } = action.payload;
      state.stockData[symbol] = data;
    },
  },
});

export const {
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  updateStockData,
} = stockSlice.actions;

export default stockSlice.reducer;
