import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"

const Logout = ({ handleLogout }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAgree = async () => {
    console.log("Logged out");
    const res = await fetch('/users/logout', {
      method: 'POST'
    })
    handleLogout()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Log Out</Button>
      {/* Clicking logout button triggers confirmation dialog. */}
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you wish to log out?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleAgree} variant="contained" autoFocus>Yes, log out</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Logout