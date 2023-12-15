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
import { useDispatch } from 'react-redux'
import {
  setChanges,
  setIsConnected,
  setPrincipalID,
  setActiveProvider,
  setUserIDs,
  setBackendActor,
} from './features/plugSlice'
import Dashboard from './components/Dashboard'
import Index from './components/Index'
import SharedLayout from './components/SharedLayout'
import { Principal } from '@dfinity/principal'
const client = createClient({
  providers: defaultProviders,
})

function App() {
  const dispatch = useDispatch()

  const connectionInstance = useConnect({
    onConnect: async (connObj) => {
      //create the backend actor and fetch the user ids
      console.log('conn onj :', connObj.activeProvider.createActor)
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
      navigate('/dashboard')
    },
    onDisconnect: () => {
      dispatch(setIsConnected(false))
      dispatch(setPrincipalID(null))
      navigate('/')
    },
  })

  console.log(connectionInstance)
  const { isConnected } = useDispatch((state) => state.plug)
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Index />} />
          <Route path="dashboard" element={<Dashboard />} />
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
