import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { PropagateLoader } from 'react-spinners'
import { IoMdClose } from 'react-icons/io'
import { useConnect } from '@connect2ic/react'
import {
  canisterId as backendCanisterID,
  idlFactory,
} from '../../declarations/backend'
import { logDOM } from '@testing-library/react'
import { setChanges } from '../../features/plugSlice'
import { Principal } from '@dfinity/principal'
import { IoAddCircle } from 'react-icons/io5'
idlFactory
function SaveEmailModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const connectionInstance = useConnect({
    onConnect: async () => {},
    onDisconnect: () => {},
  })

  async function saveAccountDetails(data) {
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
      const results = await actor.subscribeToNotifications(
        Principal.fromText(connectionInstance.principal),
        data.email_address,
      )
      console.log('save email details :', results)
      if (results.ok) {
        setChanges(Math.random())
      }
      setIsLoading(false)
    } catch (error) {
      console.log('error in saving account details :', error)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="submit"
        className="rounded-md border mt-4 shadow-md shadow-black w-3/4 flex gap-1 p-1 hover:bg-yellow-500 justify-center items-center"
      >
        <IoAddCircle />
        Add Email
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity"
              aria-hidden="true"
            ></div>
            <div
              style={{ backgroundColor: '#11131f' }}
              className="rounded-lg overflow-hidden relative shadow-xl flex flex-col justify-center items-center transform transition-all sm:max-w-md sm:w-full"
            >
              <div className="mt-2 flex w-full justify-end mr-6">
                <IoMdClose
                  size={25}
                  className="hover:cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <Formik
                initialValues={{ email_address: '' }}
                validate={(values) => {
                  const errors = {}

                  if (!values.email_address) {
                    errors.email_address = 'email address is required'
                  }

                  return errors
                }}
                //save the data in the backend
                onSubmit={(values, { setSubmitting }) => {
                  saveAccountDetails(values)
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="flex  p-6 flex-col gap-4 w-3/4 justify-center items-center text-black">
                    <h1 className="mt-2 text-white border-b-2 pb-1 flex w-full justify-center items-center text-xl">
                      Set Up Email
                    </h1>
                    <div className="flex-col gap-1 w-full">
                      <label
                        htmlFor="email_address"
                        className="text-white text-left"
                      >
                        enter email address
                      </label>
                      <Field
                        type="text"
                        name="email_address"
                        className="rounded-md h-8 w-full"
                      />
                      <ErrorMessage
                        name="email_address"
                        component="span"
                        className="text-white bg-red-500 p-1"
                      />
                    </div>

                    <button
                      type="submit"
                      style={{ boxShadow: 'red' }}
                      className="rounded-md text-white text-2xl border hover:bg-yellow-500 w-1/2 mb-4"
                    >
                      {isLoading ? <PropagateLoader color="#36d7b7" /> : 'save'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SaveEmailModal
