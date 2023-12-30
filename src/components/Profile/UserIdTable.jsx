import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  canisterId as backendCanisterID,
  idlFactory,
} from '../../declarations/backend'
import { useConnect } from '@connect2ic/react'
import { setChanges } from '../../features/plugSlice'
const UserIdTable = () => {
  const { storedUserIDS } = useSelector((state) => state.plug)
  const connectionInstance = useConnect({
    onConnect: async () => {},
    onDisconnect: () => {},
  })
  const [isLoading, setIsLoading] = useState(false)

  //delete the id from the backend
  async function deleteID(id) {
    try {
      setIsLoading(true)
      if (connectionInstance.isConnected === false) {
        console.log('wallet is not connected :')
        return
      }
      //create the backend actor
      const { value: actor } =
        await connectionInstance?.activeProvider?.createActor(
          backendCanisterID,
          idlFactory,
        )
      //save the details.
      const results = await actor.deleteICPAdress(id)
      console.log('save details :', results)
      if (results.ok) {
        setChanges(Math.random())
      }
      setIsLoading(false)
    } catch (error) {
      console.log('error in saving account details :', error)
    }
  }

  return (
    // <div
    //   style={{ backgroundColor: '#11131f', height: '370px' }}
    //   className="overflow-x-auto rounded-lg w-full pt-4 flex justify-center"
    // >
    <table
      style={{ backgroundColor: '#11131f' }}
      className="min-w-full divide-y divide-gray-200 rounded-lg"
    >
      <thead>
        <tr>
          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Nickname
          </th>
          <th className="px-2 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
            Principal ID
          </th>
          <th className="px-2 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="flex-col justify-star w-full">
        {storedUserIDS &&
          storedUserIDS.map((token) => (
            <tr key={token.address}>
              <td className="flex px-6 py-4 text-left">{token.nickName}</td>
              <td className="text-center flex-col px-10">{token.address}</td>
              <td className="text-left flex-col px-0">
                {token.nickName === 'Primary' ? null : (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this ID?',
                        )
                      ) {
                        deleteID(token.address)
                      }
                    }}
                    className="bg-red-500 p-2 rounded-md"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    // </div>
  )
}

export default UserIdTable
