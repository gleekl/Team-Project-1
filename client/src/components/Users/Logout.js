import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

const Logout = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAgree = () => {
    console.log("Logged out");
    handleClose()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Log Out</Button>
      {/* Clicking logout button triggers confirmation dialog. */}
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{"Log out?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Logout