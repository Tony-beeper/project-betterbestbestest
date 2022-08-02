import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
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
import { createTheme } from "@material-ui/core/styles";
import { ExpandMoreRounded } from "@material-ui/icons";

import roomAPI from "../../api/rooms";
import errorHandler from "../../utils/ErrorHandler";
import { ThemeContext } from "../../App";
import AddRoomStyle from "./AddRoomStyle";
import WhiteTextTypography from "../../components/StyledMuiComponents/WhiteTypography";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e3f2fd",
    },
  },
});

const Room = () => {
  const classes = AddRoomStyle();
  const navigate = useNavigate();
  let [context, setContext] = useContext(ThemeContext);
  let [username, setUsername] = useState(context);
  const [roomName, setRoomName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const cookieCheck = document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!cookieCheck) navigate("/");
    // else navigate("/");
    setUsername(context.username);
  }, [context]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    setUsername(context.username);
    setDisable(true);

    roomAPI
      .createRoom(username, roomName)
      .then((data) => {
        navigate(`../room/${data._id}`, { replace: true });
      })
      .catch(({ response }) => {
        errorHandler.handleError(response);
        setRoomName("");
      })
      .finally(() => setDisable(false));
  };

  const handleJoin = (e) => {
    e.preventDefault();
    setDisable(true);

    roomAPI
      .joinRoom(roomNumber, joinCode)
      .then((data) => {
        navigate(`../room/${data._id}`, { replace: true });
      })
      .catch(({ response }) => {
        setRoomNumber("");
        setJoinCode("");
        errorHandler.handleError(response);
      })
      .finally(() => setDisable(false));
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
          <WhiteTextTypography variant="h5" gutterBottom margin="large">
            Create or Join a room!
          </WhiteTextTypography>
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
                  error={roomName.length > 20}
                  value={roomName}
                  fullWidth
                  onChange={handleRoomNameChange}
                  variant="standard"
                  label={
                    roomName.length < 20 ? "room name" : "room name too long"
                  }
                />
                <Button
                  disabled={disable || roomName.length > 20}
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
                  disabled={disable}
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
