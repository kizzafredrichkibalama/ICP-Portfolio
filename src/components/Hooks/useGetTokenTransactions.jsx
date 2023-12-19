import React, { useState } from 'react'
import { icrc1_Index_Factory } from '../Utils/icrc1_index.did'
import {
  CanisterIDS,
  IndexCanisters,
  getLocalIndexCanisterID,
  transformTransactionArray,
} from '../Utils/Functions'
import { createActor } from '../Utils/createActor'
import { Principal } from '@dfinity/principal'
import { useParams } from 'react-router-dom'
import { useConnect } from '@connect2ic/react'

const useGetTokenTransactions = () => {
  const [tokenTransactions, setTokenTransactions] = useState(null)
  async function getUserTokenTransactions(tokenName, userId) {
    if (tokenName === null || userId === '') return
    try {
      //get the token canister
      const tokenIndexId = getLocalIndexCanisterID(tokenName)
      //create an actor
      const IndexActor = createActor(tokenIndexId, icrc1_Index_Factory)
      //get all transactions of the user
      console.log('index :', IndexActor)
      const transactions = await IndexActor?.get_account_transactions({
        max_results: 20,
        start: [],
        account: {
          owner: Principal.fromText(userId),
          subaccount: [],
        },
      })
      console.log('user transactions :', transactions.Ok)

      if (transactions.Ok) {
        const transformedData = transformTransactionArray(
          transactions.Ok.transactions,
        )
        console.log('user transactions :', transformedData)
        setTokenTransactions(transformedData)
      }
    } catch (error) {
      console.log('error in getting user token transactions :', error)
    }
  }

  //get all the transactions for all the user addresses and store them in the store

  async function getAllUserTransactions(storedUserIDS) {
    if (!storedUserIDS) return
    try {
      for (const princiID of storedUserIDS) {
        //create the actor
        for (const canID of IndexCanisters) {
          const indexCanister = createActor(canID, icrc1_Index_Factory)

          //get the transaction history
          const transactions = await indexCanister?.get_account_transactions({
            max_results: 20,
            start: [],
            account: {
              owner: Principal.fromText(princiID.address),
              subaccount: [],
            },
          })

          console.log('user transactions :', transactions.Ok)
        }
      }
    } catch (error) {
      console.log('error in seting up all the user transactions :', error)
    }
  }

  return { tokenTransactions, getAllUserTransactions, getUserTokenTransactions }
}

export default useGetTokenTransactions
