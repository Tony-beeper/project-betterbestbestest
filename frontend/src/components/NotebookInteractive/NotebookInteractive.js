import {
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useState } from "react";
import "./NotebookInteractive.css";

import roomsAPI from "../../api/rooms";
import errorHandler from "../../utils/ErrorHandler";

const NotebookInteractive = ({ isMine, room, deleteMyRoom, leaveRoom }) => {
  const [open, setOpen] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setDisable(true);
    roomsAPI
      .deleteRoom(room._id)
      .then((data) => {
        deleteMyRoom(data._id);
      })
      .catch(({ response }) => {
        errorHandler.handleError(response);
      })
      .finally(() => {
        handleClose();
        setDisable(false);
      });
  };

  const handleLeave = (e) => {
    e.preventDefault();
    setDisable(true);
    roomsAPI
      .leaveRoom(room._id)
      .then((data) => {
        leaveRoom(data._id);
      })
      .catch(({ response }) => {
        errorHandler.handleError(response);
      })
      .finally(() => {
        handleClose();
        setDisable(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyOpen = () => {
    setKeyOpen(true);
  };

  const handleKeyClose = () => {
    setKeyOpen(false);
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="flex-end">
      {isMine && (
        <div>
          <IconButton size="small" color="inherit" onClick={handleKeyOpen}>
            <VpnKeyIcon />
          </IconButton>
          <Dialog
            open={keyOpen}
            onClose={handleKeyClose}
            aria-labelledby="key"
            aria-describedby="key-des"
          >
            <DialogTitle id="key-title">
              {"Invite your friends to code together!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                room number: {room.roomNumber}
              </DialogContentText>
              <DialogContentText>join code: {room.joinCode}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleKeyClose}
                color="primary"
                disabled={disable}
              >
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {isMine ? (
        <div>
          <IconButton size="small" color="inherit" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-delete"
            aria-describedby="alert-delete-des"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete your room"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You and your room members will not be able to access this room
                once you delete!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" disabled={disable}>
                CANCEL
              </Button>
              <Button
                disabled={disable}
                onClick={handleDelete}
                color="primary"
                autoFocus
              >
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div>
          <Button size="small" color="inherit" onClick={handleClickOpen}>
            Leave
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-leave"
            aria-describedby="alert-leave-des"
          >
            <DialogTitle id="alert-dialog-title">
              {"Leave the room"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You will not be able to access this room unless you join again!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" disabled={disable}>
                CANCEL
              </Button>
              <Button
                disabled={disable}
                onClick={handleLeave}
                color="primary"
                autoFocus
              >
                LEAVE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Grid>
  );
};

export default NotebookInteractive;
