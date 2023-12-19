import { createSlice } from "@reduxjs/toolkit";


const initialState={
    tokenPrices:null,
    extendedTokenData:null,
    totalPortfolioValue:null,
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
        setPortfolioValue:(state,{payload})=>{
            state.totalPortfolioValue = payload
        },
        setExtendedTokenData:(state,{payload})=>{
            state.extendedTokenData = payload
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
    setExtendedTokenData,
    setPortfolioValue,
    setUserTokenBalances,
    setUserTransactionHistory,
    setPercentageHoldings
} = infoSlice.actions
export default infoSlice.reducer