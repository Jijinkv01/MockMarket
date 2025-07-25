import { createSlice } from "@reduxjs/toolkit";

const profitLossSlice   = createSlice({
    name: 'profitLoss',
  initialState: {
    grossPL: 0
  },
  reducers: {
    setGrossPL: (state, action) => {
      state.grossPL = action.payload;
    }
  }     
})

export const { setGrossPL } = profitLossSlice.actions;
export default profitLossSlice.reducer;
