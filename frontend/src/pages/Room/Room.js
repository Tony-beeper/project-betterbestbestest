import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { NoteAddRounded, GroupAdd } from "@material-ui/icons";

import roomAPI from "../../api/room";
import handleError from "../../utils/errhandling";
import SimpleCard from "../../components/notebookCard";

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

  const [roomNumber, setRoomNumber] = useState(null);
  const [joinCode, setJoinCode] = useState(null);

  const handleJoin = (e) => {
    e.preventDefault();

    roomAPI
      .joinRoom(roomNumber, joinCode)
      .then((data) => {
        console.log(data);
        nevigate(`${data._id}`);
      })
      .catch(({ response }) => {
        setRoomNumber("");
        setJoinCode("");
        handleError(response);
      });
  };

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleJoinCodeChange = (e) => {
    setJoinCode(e.target.value);
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();

    roomAPI
      .createRoom("test_user")
      .then((data) => {
        console.log(data);
        nevigate(`${data._id}`);
      })
      .catch(({ response }) => {
        handleError(response);
      });
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
              expandIcon={<NoteAddRounded style={{ color: "#1565c0" }} />}
            >
              <Typography variant="h6">Create a Room</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRoom}
                type="button"
                margin="normal"
              >
                create room
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.background_blue}>
            <AccordionSummary
              expandIcon={<GroupAdd style={{ color: "#1565c0" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Join a Room</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="form" onSubmit={handleJoin} sx={{ mt: 1 }}>
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
        <SimpleCard />
      </div>
    </Container>
  );
};

export default Room;
