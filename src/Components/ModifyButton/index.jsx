import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ModifyButton = ({ handler, mod, setShowMod }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    handler();
    setOpen(false);
    setShowMod(false);
  };

  return (
    <div style={{ paddingTop: "0" }}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ padding: ".5rem" }}
      >
        {mod}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"CONFIRM "}
          {mod}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be reverted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button color="error" onClick={handleUpdate} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
