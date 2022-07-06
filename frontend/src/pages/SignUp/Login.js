import React from "react";
import LoginContainer from "./src/LoginContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../../index.css";

const Login = () => {
  return (
    <MuiThemeProvider>
      <LoginContainer />
    </MuiThemeProvider>
  );
};

export default Login;
