import { createSlice } from "@reduxjs/toolkit";


const initialState={
    tokenPrices:null,
    userTokenBalances:null,
    userTransactions:null,
    percentagePerToken:null,
    
}
const infoSlice = createSlice({
    name:'info',
    initialState,
    reducers:{
        setTokenPrices:(state,{payload})=>{
            state.tokenPrices = payload
        },
        setUserTokenBalances:(state,{payload})=>{
            state.userTokenBalances = payload
        },
        setUserTransactionHistory:(state,{payload})=>{
          state.userTransactions = payload
        },
        setPercentageHoldings:(state,{payload})=>{
            state.percentagePerToken = payload
        },
    }
})

console.log(infoSlice);
export const {
    setTokenPrices,
    setUserTokenBalances,
    setUserTransactionHistory,
    setPercentageHoldings
} = infoSlice.actions
export default infoSlice.reducer