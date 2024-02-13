import React from 'react'
import {
  copyToClipboard,
  shorten17String,
  shortenString,
} from '../Utils/Functions'
import { FaRegCopy } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import UserIdTable from './UserIdTable'
import AddNewModal from './AddNewModal'
import SaveEmailModal from './setMyEmail'
import SubscribeToNotifications from './Subscribe'
import { RxUpdate } from 'react-icons/rx'

const Profile = () => {
  const { principalID, storedUserIDS, userInfo } = useSelector(
    (state) => state.plug,
  )
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
        <div className="flex flex-col items-center rounded-lg justify-center">
          <h2 className="uppercase text-xl">Email Address</h2>
          <div className="flex gap-2 justify-center items-center">
            <span>
              {userInfo ? (
                userInfo?.email
              ) : (
                <div className="bg-red-500 flex p-1">No email found</div>
              )}
            </span>
          </div>
          <SaveEmailModal />
        </div>
        <div className="flex flex-col rounded-lg justify-center">
          <h2 className="uppercase text-xl">Firebase</h2>
          <div className="flex gap-2 justify-center items-center">
            <span>coming soon...</span>
          </div>
          <button className="rounded-md border shadow-md shadow-black mt-4 flex gap-1 p-1 justify-center items-center hover:bg-yellow-500">
            <RxUpdate color="yellow" />
            Update
          </button>
        </div>
        <div className="flex flex-col rounded-lg justify-center">
          <AddNewModal />
          <SubscribeToNotifications />
        </div>
      </div>
      <div className="mt-8">
        <UserIdTable />
      </div>
    </div>
  )
}

export default Profile
