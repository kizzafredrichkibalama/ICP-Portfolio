import React from 'react'
import { useAuth } from '../use-auth-client'
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from '@connect2ic/react'
import { useSelector } from 'react-redux'
const one = () => {
  const { activeProvider } = useSelector((state) => state.plug)
  const { tokenPrices } = useSelector((state) => state.info)
  console.log('as :', activeProvider, tokenPrices)
  return (
    <>
      <ConnectButton />
      <ConnectDialog />
    </>
  )
}

export default one
