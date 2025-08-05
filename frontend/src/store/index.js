import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice"
import balanceReducer from "../store/balanceSlice"
import stockReducer from "../store/stockSlice"
import profitLossReducer from "../store/profitLossSlice "


export const store = configureStore({
    reducer: {
        user: userReducer,
        balance: balanceReducer,
        stocks: stockReducer,
        profitLoss: profitLossReducer,
      



    }
})