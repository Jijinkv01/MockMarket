import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
    name: "balance",
    initialState:{
        amount:0
    },
    reducers: {
        setBalance:(state,action) =>{
            state.amount=action.payload
        },
        updateBalance: (state,action) => {
            state.amount += action.payload
        }
    }
})

export const { setBalance, updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;