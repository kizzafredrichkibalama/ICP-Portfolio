import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useGetNftBalances = () => {
  const { storedUserIDS } = useSelector((state) => state.plug)

  const nftGeekHost = 'api.nftgeek.app'
  const apiVersion = 'pwmanager'
  const accountIdentifier =
    '7ft3p-pvre5-sqar3-ahrn3-3iesy-khjds-bjcu5-oudcv-2kurv-hfi5e-4qe'
  const tokenHoldings = `https://${nftGeekHost}/api/${apiVersion}/accountIdentifier/${accountIdentifier}/tokens`
  const [nftBalance, setNftBalance] = useState(2000)

  useEffect(() => {
    getMomoToken()
  }, [storedUserIDS])

  async function getNativeBalances(sampleIDs) {
    return Promise.all(
      storedUserIDS?.map(async (princiID) => {
        const tokenHoldings = `https://${nftGeekHost}/api/${apiVersion}/principal/${princiID.address}/summary`
        return fetch(tokenHoldings)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            return {
              principal_id: princiID,
              data,
            }
          })
      }),
    )
  }

  const getMomoToken = async () => {
    const resultArray = await getNativeBalances(sampleIDs)

    const totals = resultArray.reduce(
      (acc, obj) => {
        acc.buyTransactions += obj.data.summary.buyTransactions
        acc.listings += obj.data.summary.listings
        acc.saleNfts += obj.data.summary.saleNfts
        acc.nftsFloorPriceIcp += obj.data.summary.nftsFloorPriceIcp

        acc.buyNfts += obj.data.summary.buyNfts
        acc.buyTransactionsIcp += obj.data.summary.buyTransactionsIcp
        acc.buyTransactionsUsd += obj.data.summary.buyTransactionsUsd
        acc.nftsFloorPriceUsd += obj.data.summary.nftsFloorPriceUsd
        acc.ownedNfts += obj.data.summary.ownedNfts
        acc.saleTransactions += obj.data.summary.saleTransactions
        acc.saleTransactionsIcp += obj.data.summary.saleTransactionsIcp
        acc.saleTransactionsUsd += obj.data.summary.saleTransactionsUsd
        acc.sellNfts += obj.data.summary.sellNfts
        acc.sellTransactions += obj.data.summary.sellTransactions
        acc.sellTransactionsIcp += obj.data.summary.sellTransactionsIcp

        acc.sellTransactionsUsd += obj.data.summary.sellTransactionsUsd
        return acc
      },
      {
        buyTransactions: 0,
        listings: 0,
        saleNfts: 0,
        nftsFloorPriceIcp: 0,
        buyNfts: 0,
        buyTransactionsIcp: 0,
        buyTransactionsUsd: 0,
        nftsFloorPriceUsd: 0,
        ownedNfts: 0,
        saleTransactions: 0,
        saleTransactionsIc: 0,
        saleTransactionsUsd: 0,
        sellNfts: 0,
        sellTransactions: 0,
        sellTransactionsIcp: 0,
        sellTransactionsUsd: 0,
      },
    )

    setUserNftData(totals)
    console.log('data results :', totals)
    // return totals;
  }

  return { nftBalance }
}

export default useGetNftBalances
