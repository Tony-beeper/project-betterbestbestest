import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useState } from "react";
import {
  Grid,
  IconButton,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

import roomsAPI from "../api/room";
import handleError from "../utils/errhandling";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 220,
    minHeight: 250,
    marginTop: 30,

    background: "#f5f5f5",
  },
  root_my: {
    minWidth: 220,
    minHeight: 250,
    marginTop: 30,
  },
  background_blue: {
    marginTop: 10,
    // background: "linear-gradient(to right,  #2980B9, #6DD5FA)",
    background: "#3f51b5",
    border: 0,
    color: "white",
  },
  background_red: {
    marginTop: 10,
    background: "#f44336",
    color: "white",
  },
  title: {
    fontSize: 28,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  pos: {
    marginBottom: 12,
  },
}));

const NotebookCard = ({ room, isMine }) => {
  const classes = useStyles();
  const nevigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    roomsAPI
      .deleteRoom(room._id)
      .then((data) => {
        nevigate("room");
        handleClose();
      })
      .catch(({ response }) => {
        handleError(response);
        handleClose();
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {room.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {room.date}
        </Typography>
        <div className={classes.icons}>
          {room.members.map((member, idx) => (
            <Avatar
              key={`member_${idx}`}
              style={{
                backgroundColor: ["#ffc107", deepPurple[500], deepOrange[500]][
                  idx % 3
                ],
              }}
              className={classes.small}
            >
              {member.slice(0, 1).toUpperCase()}
            </Avatar>
          ))}
        </div>
      </CardContent>
      <CardActions
        justifycontent="flex-end"
        className={isMine ? classes.background_red : classes.background_blue}
      >
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          {isMine ? (
            <div>
              <IconButton
                size="small"
                color="inherit"
                onClick={handleClickOpen}
              >
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
                    You and your room members will not be able to access this
                    room once you delete!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    CANCEL
                  </Button>
                  <Button onClick={handleDelete} color="primary" autoFocus>
                    DELETE
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ) : (
            <div>
              <IconButton
                size="small"
                color="inherit"
                onClick={handleClickOpen}
              >
                <ExitToAppIcon />
              </IconButton>
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
                    You will not be able to access this room unless you join
                    again!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    CANCEL
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    LEAVE
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}

          <IconButton
            size="small"
            color="inherit"
            variant="outlined"
            onClick={(e) => nevigate(`${room._id}`)}
          >
            <CreateIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default NotebookCard;
