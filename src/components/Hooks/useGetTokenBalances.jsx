import React, { useState } from 'react'
import { createActor } from '../Utils/createActor'
import {
  CanisterIDS,
  ProcessData,
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

  const userBalances = []
  async function getAllTokenBalances(userPrincipalsID) {
    console.log(userPrincipalsID)
    if (userPrincipalsID === '') return
    try {
      for (const princID of userPrincipalsID) {
        //fetch the account addresses of the user
        for (const canID of CanisterIDS) {
          let TokenLedger = createActor(canID, icrcIdlFactory)

          const bal = await TokenLedger?.icrc1_balance_of({
            owner: Principal.fromText(princID.address),
            subaccount: [],
          })
          const tokenMetadata = await TokenLedger.icrc1_metadata()
          const testObj = {
            principal_id: princID.address,
            balances: [
              {
                amount: Number(bal),
                canister_id: canID,
                token_symbol: tokenMetadata[2][1]?.Text,
                token_decimals: Number(tokenMetadata[0][1]?.Nat),
              },
            ],
          }
          ///////////

          let found = false
          for (let i = 0; i < userBalances.length; i++) {
            if (userBalances[i].principal_id === princID.address) {
              userBalances[i].balances = userBalances[i].balances.concat([
                {
                  amount: Number(bal),
                  canister_id: canID,
                  token_symbol: tokenMetadata[2][1]?.Text,
                  token_decimals: Number(tokenMetadata[0][1]?.Nat),
                },
              ])
              found = true
              break
            }
          }
          if (!found) {
            userBalances.push(testObj)
          }
        }
        const { tokenHoldings, totalPortfolioValue } = ProcessData(
          userBalances,
          tokenPrices,
        )
        dispatch(setUserTokenBalances(userBalances))
        dispatch(setPortfolioValue(totalPortfolioValue))
        dispatch(setPercentageHoldings(tokenHoldings))
      }
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

  return { getAllTokenBalances, singleTokenBalance, getSingleTokenBalance }
}

export default useGetTokenBalances
