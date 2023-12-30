import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetTokenBalances from '../Hooks/useGetTokenBalances'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useConnect } from '@connect2ic/react'
import { getLocalCanisterID } from '../Utils/Functions'
import { icp_idl_Factory } from '../Utils/icpIdlFactory.did'
import { icrcIdlFactory } from '../Utils/icrc1_ledger.did'
import { Principal } from '@dfinity/principal'
import { AccountIdentifier } from '@dfinity/ledger-icp'
import { FaSortAmountUpAlt } from 'react-icons/fa'
import { setChanges } from '../../features/plugSlice'
import { PropagateLoader } from 'react-spinners'
const index = () => {
  const tokens = ['ICP', 'ckBTC', 'CHAT', 'ckETH', 'HOT']
  const { principalID } = useSelector((state) => state.plug)
  const [selectedToken, setselectedToken] = useState('')
  const { singleTokenBalance, getSingleTokenBalance } = useGetTokenBalances()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const connectionInstance = useConnect({
    onConnect: async () => {},
    onDisconnect: () => {},
  })

  console.log(selectedToken, singleTokenBalance)
  function handleOptionChange(event) {
    setselectedToken(event.target.value)
  }

  useEffect(() => {
    getSingleTokenBalance(selectedToken, principalID)
  }, [selectedToken])

  // ec890f203832ef50484df9dbc0ff7e4ee84720de8393c3fb90cf589fae61b888

  async function transferFunds(data, tokenName) {
    setIsLoading(true)
    try {
      // check for the data
      if (data.tokenAmount === '' || tokenName.tokenRecipient === '') return
      // check whether the provider is connected
      if (connectionInstance.isConnected === false) return
      // get the canister id for the selected token
      const canisterID = getLocalCanisterID(tokenName)

      // if the token is icp,
      if (tokenName === 'ICP') {
        const { value: ledger } =
          await connectionInstance.activeProvider.createActor(
            canisterID,
            icp_idl_Factory,
          )

        // transfer the icp tokens
        const acc = AccountIdentifier.fromHex(
          data.tokenRecipient,
        ).toUint8Array()
        const amount = Number(data.tokenAmount) * 1e8
        const time = new Date().getTime() * 1e6
        const transferResults = await ledger.transfer({
          to: acc,
          fee: { e8s: 10000 },
          memo: 1234,
          from_subaccount: null,
          created_at_time: { timestamp_nanos: time },
          amount: { e8s: amount },
        })
      } else {
        const { value: ledger } =
          await connectionInstance.activeProvider.createActor(
            canisterID,
            icrcIdlFactory,
          ) //transfer the icrc tokens
        const amount = Number(data.tokenAmount) * 1e8
        const time = new Date().getTime() * 1e6
        const transferResults = await ledger.icrc1_transfer({
          to: {
            owner: Principal.fromText(data.tokenRecipient),
            subaccount: [],
          },
          fee: [],
          memo: [],
          from_subaccount: [],
          created_at_time: [],
          amount: amount,
        })
        console.log('TRANSFER RESULTS :', transferResults)
        if (transferResults.Ok) {
          // reload all the components that depend on the price of the tokens
          dispatch(setChanges(Math.random()))
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log('error in tansferring tokens :', error)
    }
  }

  return (
    <div
      style={{ backgroundColor: '#2D3348', minHeight: '90vh' }}
      className="flex w-full mt-10 justify-center items-center rounded-lg"
    >
      <div
        style={{ backgroundColor: '#11131f', height: '80vh' }}
        className="flex flex-col items-center rounded-lg gap-4 w-1/2 absolute"
      >
        <h1 className="flex p-4 text-2xl uppercase border-b-2 w-3/4 justify-center items-center ">
          Transfer
        </h1>
        <div className="flex flex-col mt-2">
          <span>Account</span>
          <span>{principalID}</span>
        </div>
        {/* select token */}
        <div className="text-black">
          <select
            id="options"
            name="options"
            value={selectedToken}
            onChange={handleOptionChange}
            className="block mt-1 mb-2 rounded-md border-gray-300 "
          >
            <option value="">--Select token--</option>
            {tokens.map((tok) => {
              return (
                <option key={tok} value={tok}>
                  {tok}
                </option>
              )
            })}
          </select>
          {singleTokenBalance !== null && (
            <span className="text-white">Balance : {singleTokenBalance}</span>
          )}{' '}
        </div>

        <Formik
          initialValues={{ tokenRecipient: '', tokenAmount: '' }}
          validate={(values) => {
            const errors = {}

            if (!values.tokenRecipient) {
              errors.tokenRecipient = 'Reciever Id required'
            }
            if (!values.tokenAmount) {
              errors.tokenAmount = 'Token amount required'
            } else if (values.tokenAmount > singleTokenBalance) {
              errors.tokenAmount = 'Amount exceeds the available balance'
            }

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)
            transferFunds(values, selectedToken)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 w-3/4 justify-center items-center text-black">
              <div className="flex-col gap-1 w-full">
                <label htmlFor="tokenAMount" className="text-white text-left">
                  {selectedToken === 'ICP'
                    ? 'enter reciever account Id'
                    : 'enter reciever Principal Id'}
                </label>
                <Field
                  type="text"
                  name="tokenRecipient"
                  // placeholder="enter reciever principal"
                  className="rounded-md h-8 w-full"
                />
                <ErrorMessage
                  name="tokenRecipient"
                  component="span"
                  className="text-white bg-red-500 p-1"
                />
              </div>
              <div className="flex-col gap-1 w-full">
                <label htmlFor="tokenAMount" className="text-white">
                  enter amount
                </label>
                <Field
                  type="number"
                  name="tokenAmount"
                  // placeholder="enter token amount"
                  className="rounded-md h-8 text-black w-full"
                />
                <div className="flex gap-8">
                  <span className="text-white flex text-left">
                    fee : 0.0001
                  </span>

                  <ErrorMessage
                    name="tokenAmount"
                    component="span"
                    className="text-white ml-16 bg-red-500 p-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="rounded-md text-white jus text-2xl hover:bg-yellow-500 w-1/2 mb-8 border"
                disabled={isSubmitting}
              >
                {isLoading ? <PropagateLoader color="#36d7b7" /> : 'Send'}
              </button>
            </Form>
          )}
        </Formik>

        {/* enter recipient */}
        {/* <input
          id="tokenRecipient"
          name="tokenRecipient"
          onChange={handleDetailsChange}
          type="text"
          placeholder="enter recipient"
          className="w-3/4 text-black"
        /> */}
        {/* enter amount */}
        {/* <input
          onChange={handleDetailsChange}
          type="number"
          id="tokenAmount"
          name="tokenAmount"
          placeholder="enter amount"
          className="w-3/4 text-black"
        /> */}
        {/* <button>Send</button> */}
      </div>
    </div>
  )
}

export default index
