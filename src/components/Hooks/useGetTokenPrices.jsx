import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { extendedTokenData, tokenPriceData } from '../Utils/Data'
import { setTokenPrices, setExtendedTokenData } from '../../features/infoSlice'
import { createActor } from '../Utils/createActor'
import { price_oracle_idlFactory } from '../Utils/priceOracle.did'
import { formatExtendedTokenData } from '../Utils/Functions'
const useGetTokenPrices = () => {
  //   const {} = useSelector((state) => state.info)
  const dispatch = useDispatch()
  const PRICE_ORACLE_CANISTER_ID = ''
  const [tokenInfo, setTokenInfo] = useState(null)
  async function getTokenPrices() {
    try {
      if (process.env.DFX_NETWORK !== 'ic') {
        //load the dummy data
        dispatch(setTokenPrices(tokenPriceData))
        dispatch(setExtendedTokenData(extendedTokenData))
      } else {
        //create an actor
        const tokenActor = createActor(
          PRICE_ORACLE_CANISTER_ID,
          price_oracle_idlFactory,
        )

        //fetch the lates data and set it up
        const results = tokenActor?.get_latest()
        const results2 = tokenActor?.get_latest_extended()

        dispatch(setTokenPrices(results))
        dispatch(setExtendedTokenData(results2))
      }
    } catch (error) {
      console.log('error in getting token prices :', error)
    }
  }

  async function getTokenInfo(tokenName, extendedTokenData) {
    const results = formatExtendedTokenData(tokenName, extendedTokenData)
    setTokenInfo(results)
  }

  return { getTokenPrices, getTokenInfo, tokenInfo }
}

export default useGetTokenPrices
