import { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { useNavigate } from "react-router-dom";

import NotebookCard from "../../components/NotebookCard";
import roomsAPI from "../../api/rooms";
import errorHandler from "../../utils/ErrorHandler";
import { ThemeContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const Room = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  let [context, setContext] = useContext(ThemeContext);
  let [username, setUsername] = useState(context);
  const [myRooms, setMyRooms] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const cookieCheck = document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!cookieCheck) navigate("/");
    setUsername(context.username);

    roomsAPI
      // .getRooms(username.username)
      .getRooms(username.username)
      .then((data) => {
        setMyRooms(data.myRooms);
        setRooms(data.rooms);
      })
      .catch(({ response }) => {
        errorHandler.handleError(response);
      });
  }, [context]);

  const deleteMyRoom = (roomId) => {
    setMyRooms(
      myRooms.filter((value, index, array) => {
        return value._id !== roomId;
      })
    );
  };

  const leaveRoom = (roomId) => {
    setRooms(
      rooms.filter((value, index, array) => {
        return value._id !== roomId;
      })
    );
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.header}>
        <Typography variant="h2" style={{ marginTop: 30, marginBottom: 20 }}>
          My Rooms
        </Typography>
        <Button
          variant="contained"
          size="large"
          style={{
            color: "white",
            marginTop: 40,
            marginBottom: 30,
            background: "linear-gradient(to right,  #2980B9, #6DD5FA)",
          }}
          onClick={(e) => {
            navigate("add");
          }}
          startIcon={<LibraryAddIcon />}
        >
          <Typography variant="subtitle1">add new room</Typography>
        </Button>
      </div>
      <Grid container spacing={7}>
        {myRooms.map((myRoom, idx) => (
          <Grid item key={`myRoom_${idx}`}>
            <NotebookCard
              room={myRoom}
              isMine={true}
              leaveRoom={leaveRoom}
              deleteMyRoom={deleteMyRoom}
            />
          </Grid>
        ))}
        {rooms.map((room, idx) => (
          <Grid item key={`room_${idx}`}>
            <NotebookCard
              room={room}
              isMine={false}
              leaveRoom={leaveRoom}
              deleteMyRoom={deleteMyRoom}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Room;
