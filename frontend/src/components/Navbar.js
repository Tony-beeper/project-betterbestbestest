import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../App";
// module.getUsername = function () {
//   return document.cookie.replace(
//     /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
//     "$1"
//   );
// };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Bar = () => {
  let Nav = useNavigate();
  let [context, setContext] = useContext(ThemeContext);

  const classes = useStyles();
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    );
  }, [context]);

  const HandleSignout = async () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/user/";
    await axios({
      method: "GET",
      url: backendURL + "signout",
      headers: {},
      data: {},
      withCredentials: true,
    });
    setUsername("");
    Nav("/");
  };

  const handleRoomsClick = async () => {
    Nav("/room");
  };

  return (
    <div className={classes.root}>
      {username ? (
        <>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                CodeT
              </Typography>

              <Button color="inherit" onClick={handleRoomsClick}>
                Rooms
              </Button>

              <Button color="inherit" onClick={HandleSignout}>
                SignOut
              </Button>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                CodeT
              </Typography>
              <Button color="inherit" href="login">
                Login
              </Button>
              <Button color="inherit" href="signup">
                Signup
              </Button>
            </Toolbar>
          </AppBar>
        </>
      )}
    </div>
  );
};

export default Bar;
