import { ConnectButton, ConnectDialog } from '@connect2ic/react'
import React from 'react'

const index = () => {
  return (
    <div>
      <div className=" md:flex mt-10 justify-center">
        <div className="flex flex-col justify-center items-center md:w-1/2">
          <h2 className="text-bold text-purple-500 md:text-6xl text-2xl">
            PW MANAGER
          </h2>
          <span className="items-center justify-center flex-wrap px-20 py-5">
            A No-key crosschain wallet and portfolio manager built on the
            Internet computer
          </span>
          <div className="mt-10">
            <ConnectButton />
            <ConnectDialog />
          </div>
        </div>
        <div className="md:w-1/2 mt-10">
          <img
            className="w-full h-[500px]"
            src="../../assets/portfolio.jpg"
            alt="portfolio"
          />
        </div>
      </div>
    </div>
  )
}

export default index
