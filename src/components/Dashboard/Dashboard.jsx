import React, { useEffect } from 'react'
import useGetTokenBalances from '../Hooks/useGetTokenBalances'
import { useSelector } from 'react-redux'
import useGetTokenTransactions from '../Hooks/useGetTokenTransactions'
import Sidebar from '../Sidebar'
import { CgProfile } from 'react-icons/cg'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { fixDecimals, shortenString } from '../Utils/Functions'
const Dashboard = () => {
  const { storedUserIDS, changes } = useSelector((state) => state.plug)
  const { tokenPrices, percentagePerToken, totalPortfolioValue } = useSelector(
    (state) => state.info,
  )
  const navigate = useNavigate()
  const { getAllTokenBalances } = useGetTokenBalances()
  const { getAllUserTransactions } = useGetTokenTransactions()
  console.log('user ids :', storedUserIDS, percentagePerToken)
  console.log('token prices :', tokenPrices)
  useEffect(() => {
    if (!storedUserIDS) return
    getAllTokenBalances(storedUserIDS)
  }, [storedUserIDS, changes])

  useEffect(() => {
    getAllUserTransactions(storedUserIDS)
  }, [storedUserIDS, changes])

  return (
    <div
      style={{ backgroundColor: '#2D3348', minHeight: '90vh' }}
      className="flex flex-col  items-center w-full mt-10 rounded-lg min-h-screen px-4"
    >
      <div className="flex justify-between items-center w-full pb-2">
        <div className="flex justify-center items-center text-xl px-2 text-bold">
          Dashboard
        </div>
        <div
          style={{ backgroundColor: '#11131f' }}
          className="flex gap-2 px-4 justify-between bg-transparent items-center rounded-md focus:outline-none focus:ring-2 mt-2 "
        >
          <input
            name="principalID"
            type="text"
            placeholder="search token"
            className="w-4/5 rounded-full focus:outline-none px-2 h-10"
            style={{ backgroundColor: '#11131f' }}
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
      <div className="flex justify-start text-left flex-col py-4 w-full">
        <div className="text-sm italic">Portfolio Value</div>
        <span className="text-xl">${fixDecimals(totalPortfolioValue, 3)}</span>
      </div>
      {/* show the token holdings of the user */}
      <div
        style={{ backgroundColor: '#11131f' }}
        className="overflow-x-auto w-full justify-center items-center rounded-lg pt-4 flex "
      >
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Token
              </th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Percentage(%)
              </th>
              <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Balance
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Value (USD)
              </th>
            </tr>
          </thead>
          <tbody className="flex-col justify-center">
            {percentagePerToken &&
              Object.keys(percentagePerToken).map((token) => (
                <tr key={token}>
                  <td
                    onClick={() => navigate(token)}
                    className="flex px-2 py-4 text-center hover:cursor-pointer hover:text-yellow-300"
                  >
                    {token}
                  </td>
                  <td className="text-center flex-col px-2">
                    {fixDecimals(percentagePerToken[token].percentage, 5)}
                  </td>
                  <td className="text-left flex-col px-0">
                    {fixDecimals(percentagePerToken[token].balance, 5)}
                  </td>
                  <td className="text-left flex-col px-3">
                    {fixDecimals(percentagePerToken[token].value, 5)}
                  </td>
                  {/* <td className="text-left flex-col px-3">
                    {percentagePerToken[token].value}
                  </td> */}
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
