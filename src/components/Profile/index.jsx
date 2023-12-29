import React from 'react'
import { copyToClipboard, shortenString } from '../Utils/Functions'
import { FaRegCopy } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import UserIdTable from './UserIdTable'
import AddNewModal from './AddNewModal'

const Profile = () => {
  const { principalID, storedUserIDS } = useSelector((state) => state.plug)
  console.log('user ids :', storedUserIDS)
  return (
    <div
      style={{ backgroundColor: '#2D3348', minHeight: '90vh' }}
      className=" w-full mt-10 justify-center rounded-lg p-2"
    >
      <div className=" flex items-center justify-center p-4 text-xl border-b-2 uppercase">
        Profile
      </div>
      {/* principal ID, email and firebase */}
      <div className="flex w-full justify-between p-4 border rounded-sm  ">
        <div className="flex flex-col rounded-lg p-8 justify-center">
          <h2 className="uppercase text-xl">Principal ID</h2>
          <div className="flex gap-2 justify-center items-center">
            <span>{shortenString(principalID)}</span>
            <FaRegCopy
              className="hover:cursor-pointer"
              onClick={() => copyToClipboard(principalID)}
            />
          </div>
        </div>
        <div className="flex flex-col rounded-lg justify-center">
          <h2 className="uppercase text-xl">Email Address</h2>
          <div className="flex gap-2 justify-center items-center">
            <span>{shortenString(principalID)}</span>
            <FaRegCopy
              className="hover:cursor-pointer"
              onClick={() => copyToClipboard(principalID)}
            />
          </div>
          <button className="rounded-md border mt-4 hover:bg-yellow-500">
            Update
          </button>
        </div>
        <div className="flex flex-col rounded-lg justify-center">
          <h2 className="uppercase text-xl">Firebase</h2>
          <div className="flex gap-2 justify-center items-center">
            <span>coming soon......</span>
            <FaRegCopy
              className="hover:cursor-pointer"
              // onClick={() => copyToClipboard(principalID)}
            />
          </div>
          <button className="rounded-md border mt-4 hover:bg-yellow-500">
            Update
          </button>
        </div>
        <div className="flex flex-col rounded-lg justify-center">
          <AddNewModal />
          <AddNewModal />
        </div>
      </div>
      <div className="mt-8">
        <UserIdTable />
      </div>
    </div>
  )
}

export default Profile
