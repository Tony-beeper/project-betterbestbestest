import React from "react";
import LoginContainer from "./src/Login/LoginContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./srcIndex.css";

const Login = () => {
  return (
    <MuiThemeProvider>
      <LoginContainer />
    </MuiThemeProvider>
  );
};

export default Login;
