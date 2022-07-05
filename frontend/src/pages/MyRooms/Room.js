import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { useNavigate } from "react-router-dom";

import NotebookCard from "../../components/notebookCard";
import roomsAPI from "../../api/room";
import handleError from "../../utils/errhandling";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const Room = () => {
  const nevigate = useNavigate();
  const classes = useStyles();

  const [myRooms, setMyRooms] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    roomsAPI
      .getRooms("test")
      .then((data) => {
        setMyRooms(data.myRooms);
        setRooms(data.rooms);
      })
      .catch(({ response }) => {
        handleError(response);
      });
  }, []);

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
            nevigate("add");
          }}
          startIcon={<LibraryAddIcon />}
        >
          <Typography variant="subtitle1">add new room</Typography>
        </Button>
      </div>
      <Grid container spacing={7}>
        {myRooms.map((myRoom, idx) => (
          <Grid item key={`myRoom_${idx}`}>
            <NotebookCard room={myRoom} isMine={true} />
          </Grid>
        ))}
        {rooms.map((room, idx) => (
          <Grid item key={`room_${idx}`}>
            <NotebookCard room={room} isMine={false} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Room;
