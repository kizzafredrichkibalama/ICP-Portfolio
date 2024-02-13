import { AccountIdentifier } from '@dfinity/ledger-icp'
import { Principal } from '@dfinity/principal'
import { QRCodeCanvas } from 'qrcode.react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCopy } from 'react-icons/fa'

const NftPage = () => {
  return (
    <div
      style={{ backgroundColor: '#2D3348', minHeight: '90vh' }}
      className="flex w-full mt-10 flex-col p-2 items-center rounded-lg"
    >
      <div className=" flex w-full items-center justify-center p-4 text-xl border-b-2 uppercase">
        NFTS
      </div>
      {/* principal ID, email and firebase */}
      <div className="flex w-full justify-between p-4 border rounded-sm "></div>
    </div>
  )
}

export default NftPage
