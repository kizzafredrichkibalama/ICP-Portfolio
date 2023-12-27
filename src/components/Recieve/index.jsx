import { AccountIdentifier } from '@dfinity/ledger-icp'
import { Principal } from '@dfinity/principal'
import { QRCodeCanvas } from 'qrcode.react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegCopy } from 'react-icons/fa'
import { copyToClipboard, shortenString } from '../Utils/Functions'
const index = () => {
  const { principalID } = useSelector((state) => state.plug)
  const [selectedOption, setSelecedOption] = useState('ICP')
  console.log(selectedOption)

  async function handleCopy(text) {}

  return (
    <div className="flex flex-col  w-full mt-4 min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 mb-4">
        <div>Recieve</div>
        <div className="flex gap-4">
          <div
            className="hover:cursor-pointer"
            onClick={() => setSelecedOption('ICP')}
          >
            ICP
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => setSelecedOption('OTHER')}
          >
            OTHER
          </div>
        </div>
      </div>

      <div>
        {selectedOption === 'ICP' && principalID && (
          <div className="flex flex-col justify-center items-center gap-2">
            <div
              style={{ backgroundColor: '#2D3348' }}
              className="border rounded-lg  p-6"
            >
              <QRCodeCanvas
                size={200}
                value={AccountIdentifier.fromPrincipal({
                  principal: Principal.fromText(principalID),
                  subAccount: undefined,
                }).toHex()}
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <span>
                {shortenString(
                  AccountIdentifier.fromPrincipal({
                    principal: Principal.fromText(principalID),
                    subAccount: undefined,
                  }).toHex(),
                )}
              </span>

              <FaRegCopy
                className="hover:cursor-pointer"
                onClick={() =>
                  copyToClipboard(
                    AccountIdentifier.fromPrincipal({
                      principal: Principal.fromText(principalID),
                      subAccount: undefined,
                    }).toHex(),
                  )
                }
              />
            </div>
          </div>
        )}

        {selectedOption === 'OTHER' && principalID && (
          <div className="flex flex-col justify-center items-center gap-2">
            <div
              style={{ backgroundColor: '#2D3348' }}
              className="border rounded-lg p-6"
            >
              <QRCodeCanvas size={200} value={principalID} />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div>{shortenString(principalID)}</div>
              <FaRegCopy
                className="hover:cursor-pointer"
                onClick={() => copyToClipboard(principalID)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default index
