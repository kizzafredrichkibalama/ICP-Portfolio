import React from "react"
import { css } from "@emotion/react"
import { SyncLoader } from "react-spinners"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <SyncLoader css={override} size={10} color={"white"} loading={true} />
    </div>
  )
}

export default LoadingSpinner
