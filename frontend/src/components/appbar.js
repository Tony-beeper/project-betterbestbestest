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

// module.getUsername = function () {
//   return document.cookie.replace(
//     /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
//     "$1"
//   );
// };
const handleSignout = async () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/user/";
  const res = await axios({
    method: "GET",
    url: backendURL + "signout",
    headers: {},
    data: {},
  });
};

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

// const showHideSignupLogin = () => {};
const Bar = () => {
  const classes = useStyles();
  const username = document.cookie.replace(
    /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  // const username = "";
  // console.log(username);
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

              <Button color="inherit" onClick={handleSignout}>
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
