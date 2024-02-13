import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetTokenPrices from '../Hooks/useGetTokenPrices'
import {
  canisterId as backendCanisterID,
  idlFactory,
} from '../../declarations/backend'

import {
  setIsConnected,
  setPrincipalID,
  setUserIDs,
  setUserInfo,
} from '../../features/plugSlice'
import { Principal } from '@dfinity/principal'
import { useNavigate } from 'react-router-dom'

const index = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { getTokenPrices } = useGetTokenPrices()
  const { changes } = useSelector((state) => state.plug)

  const connectionInstance = useConnect({
    onConnect: async () => {
      console.log('connecting')
    },
    onDisconnect: async () => {
      console.log('disconnecting')
      dispatch(setIsConnected(false))
      dispatch(setPrincipalID(null))
      navigate('/')
    },
  })

  // console.log(connectionInstance)
  // console.log(connectionInstance.principal)

  useEffect(() => {
    if (!connectionInstance.principal || !connectionInstance.isConnected) return
    initialAppLoad(connectionInstance)
    getTokenPrices()
    navigate('/dashboard')
  }, [connectionInstance.isConnected, changes])

  async function initialAppLoad(connObj) {
    try {
      //create the backend actor and fetch the user ids
      console.log('conn onj :', connObj)
      const { value: actor } = await connObj?.activeProvider?.createActor(
        backendCanisterID,
        idlFactory,
      )
      //get all the user addresses
      const addresses = await actor.getAllUserICPAddresses(
        Principal.fromText(connObj.principal),
      )
      const userinfo = await actor.getUserAcc(
        Principal.fromText(connObj.principal),
      )
      // console.log('user info :', userinfo)
      dispatch(setUserInfo(userinfo.ok))
      dispatch(setUserIDs(addresses.ok))
      dispatch(setIsConnected(true))
      dispatch(setPrincipalID(connObj.principal))
    } catch (error) {
      console.log('error in loading app contents for the first time :', error)
    }
  }

  return (
    <div>
      <div className=" md:flex mt-10 justify-center">
        <div className="flex flex-col justify-center items-center md:w-1/2">
          <h2 className="text-bold text-purple-500 md:text-6xl text-2xl">
            ICP Portfolio
          </h2>
          <span className="items-center justify-center flex-wrap px-20 py-5">
            A portfolio manager Dapp built on the Internet computer. Track,
            monitor, and maximize your crypto
          </span>
          <div className="mt-10">
            <ConnectButton />
            <ConnectDialog />
          </div>
        </div>
        <div className="md:w-1/2 mt-10">
          <img
            className="w-full h-[500px]"
            src="../../assets/port.png"
            alt="portfolio"
          />
        </div>
      </div>
    </div>
  )
}

export default index
