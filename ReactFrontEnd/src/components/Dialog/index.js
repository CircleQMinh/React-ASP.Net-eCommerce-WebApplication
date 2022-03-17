import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function AlertDialog(props) {
  const { open, setOpen, handleAccept, title } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const Confirm = () => {
    handleAccept();
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color:"#e74c3c"}}>Thoát</Button>
          <Button onClick={Confirm}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
