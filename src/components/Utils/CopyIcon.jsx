import React, { useState } from "react"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import FileCopyIcon from "@mui/icons-material/FileCopy"

export const CopyButton = ({ text }) => {
  const [open, setOpen] = useState(false)

  const handleCopyToClipboard = () => {
    // Create a new textarea element to hold the text
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    // Select the text in the textarea
    textArea.select()
    // Execute the copy command
    document.execCommand("copy")
    // Remove the textarea element
    document.body.removeChild(textArea)
    // Show a snackbar to indicate success
    setOpen(true)
  }

  const handleCloseSnackbar = () => {
    setOpen(false)
  }

  return (
    <div>
      <FileCopyIcon
        sx={{ fontSize: "22px", ml: "10px", cursor: "pointer" }}
        onClick={handleCopyToClipboard}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message='Text Copied to Clipboard'
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize='10px' />
          </IconButton>
        }
      />
    </div>
  )
}
