import React from "react";
import LoginContainer from "./LoginContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const Login = () => {
  return (
    <MuiThemeProvider>
      <LoginContainer />
    </MuiThemeProvider>
  );
};

export default Login;
