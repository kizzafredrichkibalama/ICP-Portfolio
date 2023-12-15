import React from "react";

const SnackBarTemplate = (textMessage) => {
  const [open, setOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={textMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="10px" />
          </IconButton>
        }
      />
    </div>
  );
};

export default SnackBarTemplate;
