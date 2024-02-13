import React, { useState } from 'react'
import { createActor } from '../Utils/createActor'
import {
  CanisterIDS,
  ProcessData,
  getIndividualIdHoldings,
  getLocalCanisterID,
  getUserICPNetWorth,
  transformDataArray,
} from '../Utils/Functions'
import { Principal } from '@dfinity/principal'
import { icrcIdlFactory } from '../Utils/icrc1_ledger.did'
import { useConnect } from '@connect2ic/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setUserTokenBalances,
  setPortfolioValue,
  setPercentageHoldings,
} from '../../features/infoSlice'
const useGetTokenBalances = () => {
  const { tokenPrices } = useSelector((state) => state.info)
  const dispatch = useDispatch()
  const [singleTokenBalance, setSingleTokenBalance] = useState(null)
  const [indIdHoldings, setIndIdHoldings] = useState(null)
  const userBalances = {}

  // Modify the getAllTokenBalances function to handle asynchronous operations
  async function getAllTokenBalances(userPrincipalsID) {
    console.log(userPrincipalsID)
    if (userPrincipalsID === '') return

    try {
      for (const princID of userPrincipalsID) {
        for (const canID of CanisterIDS) {
          let TokenLedger = createActor(canID, icrcIdlFactory)

          // Perform asynchronous operations to retrieve balance and token metadata
          const bal = await TokenLedger?.icrc1_balance_of({
            owner: Principal.fromText(princID.address),
            subaccount: [],
          })
          const tokenMetadata = await TokenLedger.icrc1_metadata()

          // Create a new balance object
          const newBalance = {
            amount: Number(bal),
            canister_id: canID,
            token_symbol: tokenMetadata[2][1]?.Text,
            token_decimals: Number(tokenMetadata[0][1]?.Nat),
          }

          // Check if the principal_id already exists in userBalances
          if (userBalances[princID.address]) {
            // If it exists, push the new balance object to the balances array
            userBalances[princID.address].balances.push(newBalance)
          } else {
            // If it doesn't exist, create a new entry in userBalances
            userBalances[princID.address] = {
              principal_id: princID.address,
              balances: [newBalance],
            }
          }
        }
      }

      // Process the data, set user token balances, portfolio value, and percentage holdings
      const { tokenHoldings, totalPortfolioValue } = ProcessData(
        Object.values(userBalances), // Convert userBalances object to an array of values
        tokenPrices,
      )
      console.log('user token holdings :', tokenHoldings)
      dispatch(setUserTokenBalances(Object.values(userBalances))) // Set user token balances
      dispatch(setPortfolioValue(totalPortfolioValue)) // Set portfolio value
      dispatch(setPercentageHoldings(tokenHoldings)) // Set percentage holdings
    } catch (error) {
      console.log('error in front balances', error)
    }
  }

  async function getSingleTokenBalance(tokenName, principalID) {
    if (!principalID) return
    try {
      // get the local token ledger
      const ledgerID = getLocalCanisterID(tokenName)
      const ledgerActor = createActor(ledgerID, icrcIdlFactory)
      const balance = await ledgerActor?.icrc1_balance_of({
        owner: Principal.fromText(principalID),
        subaccount: [],
      })
      setSingleTokenBalance(Number(balance) / 1e8)
    } catch (error) {
      console.log('error in getting the token balance :', error)
    }
  }

  async function getIndHoldings(tokenName, userBalances) {
    if (!userBalances || !tokenName) return

    try {
      const results = getIndividualIdHoldings(tokenName, userBalances)
      const filteredResults = results?.filter((token) => token.amount !== 0)
      setIndIdHoldings(filteredResults)
    } catch (error) {
      console.log('error in getting the individual id holdings :', error)
    }
  }

  return {
    getAllTokenBalances,
    singleTokenBalance,
    indIdHoldings,
    getSingleTokenBalance,
    getIndHoldings,
  }
}

export default useGetTokenBalances
