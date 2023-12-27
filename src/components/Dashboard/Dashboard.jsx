import React, { useEffect } from 'react'
import useGetTokenBalances from '../Hooks/useGetTokenBalances'
import { useSelector } from 'react-redux'
import useGetTokenTransactions from '../Hooks/useGetTokenTransactions'
import Sidebar from '../Sidebar'
import { CgProfile } from 'react-icons/cg'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  const { storedUserIDS } = useSelector((state) => state.plug)
  const { tokenPrices, percentagePerToken, totalPortfolioValue } = useSelector(
    (state) => state.info,
  )
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

  return (
    <div className="flex flex-col  w-full mt-4 min-h-screen">
      <div className="flex justify-between w-full pb-2">
        <div className="flex justify-center items-center text-xl px-2 text-bold">
          Dashboard
        </div>
        <div
          style={{ backgroundColor: '#2D3348' }}
          className="flex gap-2 px-4 justify-between items-center rounded-md focus:outline-none focus:ring-2 mt-2 "
        >
          <input
            name="principalID"
            type="text"
            placeholder="search token"
            className="w-4/5 rounded-full focus:outline-none px-2 focus: outline-gray-300 h-6"
            style={{ backgroundColor: '#2D3348' }}
          />
          <FaSearch className="hover:cursor-pointer text-white" />
        </div>
        <div className="text-2xl p-4">
          <Link to="./profile">
            <CgProfile />
          </Link>
        </div>
      </div>
      {/* show the portfolio value */}
      <div className="flex justify-start items-start flex-col p-2">
        <div>Portfolio Value</div>
        <span>${totalPortfolioValue}</span>
      </div>
      {/* show the token holdings of the user */}
      <div
        style={{ backgroundColor: '#2D3348' }}
        className="overflow-x-auto rounded-lg p-4"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentage(%)
              </th>
              <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value (USD)
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Addresses
              </th>
            </tr>
          </thead>
          <tbody className="flex-col justify-star w-full">
            {percentagePerToken &&
              Object.keys(percentagePerToken).map((token) => (
                <tr key={token}>
                  <td className="flex px-6 py-4 text-left">{token}</td>
                  <td className="text-left flex-col px-10">
                    {percentagePerToken[token].percentage}
                  </td>
                  <td className="text-left flex-col px-0">
                    {percentagePerToken[token].balance}
                  </td>
                  <td className="text-left flex-col px-3">
                    {percentagePerToken[token].value}
                  </td>
                  <td className="text-left flex-col px-3">
                    {percentagePerToken[token].value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard

//ewbs4-24msb-e266v-n77o7-trfif-w6mqf-pfqyt-y4k7v-n4vyj-czljs-7qe
