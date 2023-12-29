import React, { useEffect, useState } from 'react'
import './App.css'
import {
  canisterId as backendCanisterID,
  idlFactory,
} from './declarations/backend'

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { defaultProviders } from '@connect2ic/core/providers'
import { createClient } from '@connect2ic/core'
import { Connect2ICProvider, useConnect } from '@connect2ic/react'
import '@connect2ic/core/style.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsConnected,
  setPrincipalID,
  setActiveProvider,
  setUserIDs,
  setBackendActor,
} from './features/plugSlice'
import Dashboard from './components/Dashboard/Dashboard'
import Index from './components/Index'
import SharedLayout from './components/SharedLayout'
import { Principal } from '@dfinity/principal'
import useGetTokenPrices from './components/Hooks/useGetTokenPrices'
import Recieve from './components/Recieve/index'
import Send from './components/Send/index'
import Buy from './components/Buy/index'
import SharedDashboard from './components/Dashboard/SharedDashboard'
import Profile from './components/Profile'

const client = createClient({
  providers: defaultProviders,
})

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { getTokenPrices } = useGetTokenPrices()

  const { changes } = useSelector((state) => state.plug)
  const connectionInstance = useConnect({
    onConnect: async () => {},
    onDisconnect: () => {
      dispatch(setIsConnected(false))
      dispatch(setPrincipalID(null))
      navigate('/')
    },
  })

  console.log(connectionInstance)
  console.log(connectionInstance.principal)

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
      console.log(addresses)
      dispatch(setUserIDs(addresses.ok))
      dispatch(setBackendActor(JSON.stringify(actor)))
      dispatch(setIsConnected(true))
      dispatch(setPrincipalID(connObj.principal))
    } catch (error) {
      console.log('error in loading app contents for the first time :', error)
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Index />} />
          <Route path="dashboard" element={<SharedDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="recieve" element={<Recieve />} />
            <Route path="send" element={<Send />} />
            <Route path="buy" element={<Buy />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default () => (
  <BrowserRouter>
    <Connect2ICProvider client={client}>
      <App />
    </Connect2ICProvider>
  </BrowserRouter>
)
