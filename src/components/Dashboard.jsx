import React, { useEffect } from 'react'
import useGetTokenBalances from './Hooks/useGetTokenBalances'
import { useSelector } from 'react-redux'
import useGetTokenTransactions from './Hooks/useGetTokenTransactions'

const Dashboard = () => {
  const { storedUserIDS } = useSelector((state) => state.plug)
  const { tokenPrices, percentagePerToken } = useSelector((state) => state.info)
  const { getAllTokenBalances } = useGetTokenBalances()
  const { getAllUserTransactions } = useGetTokenTransactions()
  console.log('user ids :', storedUserIDS, percentagePerToken)
  console.log('token prices :', tokenPrices)
  useEffect(() => {
    if (!storedUserIDS) return
    getAllTokenBalances(storedUserIDS)
  }, [storedUserIDS])

  useEffect(() => {
    getAllUserTransactions(storedUserIDS)
  }, [storedUserIDS])

  return <div>Dashboard</div>
}

export default Dashboard
