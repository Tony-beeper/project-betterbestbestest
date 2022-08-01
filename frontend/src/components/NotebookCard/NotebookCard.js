import { useNavigate } from "react-router-dom";
import useStyles from "./NotebookCardStyle";

import { Card, CardActions, CardContent, Typography } from "@material-ui/core";

import NotebookInteractive from "../NotebookInteractive/NotebookInteractive";
import UserNameList from "../UserNameList/UserNameList";

const NotebookCard = ({ room, isMine, leaveRoom, deleteMyRoom }) => {
  const classes = useStyles();
  const nevigate = useNavigate();

  return (
    <Card className={classes.root}>
      <CardContent onClick={(e) => nevigate(`${room._id}`)}>
        <Typography className={classes.title} gutterBottom>
          {room.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {new Date(room.date).toISOString().split("T")[0]}
        </Typography>
        <div className={classes.icons}>
          <UserNameList users={room.members} />
        </div>
      </CardContent>
      <CardActions
        justifycontent="flex-end"
        className={isMine ? classes.background_red : classes.background_blue}
      >
        <NotebookInteractive
          isMine={isMine}
          room={room}
          deleteMyRoom={deleteMyRoom}
          leaveRoom={leaveRoom}
        />
      </CardActions>
    </Card>
  );
};

export default NotebookCard;
