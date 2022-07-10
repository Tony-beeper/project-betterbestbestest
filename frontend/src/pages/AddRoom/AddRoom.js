import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { ExpandMoreRounded } from "@material-ui/icons";

import roomAPI from "../../api/rooms";
import handleError from "../../utils/errhandling";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: 50,
  },
  background_blue: {
    marginTop: 10,
    background: "linear-gradient(to right,  #2980B9, #6DD5FA)",
    border: 0,
    color: "white",
    borderRadius: 3,
  },
  textField: {
    marginBottom: 10,
  },
  input: {
    color: "white",
  },
});

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e3f2fd",
    },
  },
});

const Room = () => {
  const classes = useStyles();
  const nevigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const handleCreateRoom = (e) => {
    e.preventDefault();

    roomAPI
      .createRoom("test", roomName)
      .then((data) => {
        console.log(data);
        nevigate(`../room/${data._id}`, { replace: true });
      })
      .catch(({ response }) => {
        handleError(response);
        setRoomName("");
      });
  };

  const handleJoin = (e) => {
    e.preventDefault();

    roomAPI
      .joinRoom(roomNumber, joinCode)
      .then((data) => {
        console.log(data);
        nevigate(`../room/${data._id}`, { replace: true });
      })
      .catch(({ response }) => {
        setRoomNumber("");
        setJoinCode("");
        handleError(response);
      });
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleJoinCodeChange = (e) => {
    setJoinCode(e.target.value);
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <Typography variant="h5" gutterBottom margin="large">
            Create or Join a room!
          </Typography>
          <Accordion className={classes.background_blue}>
            <AccordionSummary
              expandIcon={<ExpandMoreRounded style={{ color: "#1565c0" }} />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h6">Create a Room</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="form" onSubmit={handleCreateRoom}>
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  className={classes.textField}
                  required
                  color="secondary"
                  value={roomName}
                  fullWidth
                  onChange={handleRoomNameChange}
                  variant="standard"
                  label="room name"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  margin="normal"
                >
                  CREATE
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.background_blue}>
            <AccordionSummary
              expandIcon={<ExpandMoreRounded style={{ color: "#1565c0" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Join a Room</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="form" onSubmit={handleJoin}>
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  required
                  color="secondary"
                  fullWidth
                  value={roomNumber}
                  onChange={handleRoomNumberChange}
                  variant="standard"
                  label="room number"
                />
                <TextField
                  InputProps={{
                    className: classes.input,
                  }}
                  required
                  fullWidth
                  value={joinCode}
                  onChange={handleJoinCodeChange}
                  margin="normal"
                  color="secondary"
                  variant="standard"
                  label="join code"
                />
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  margin="normal"
                  type="submit"
                >
                  JOIN
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
      </div>
    </Container>
  );
};

export default Room;
