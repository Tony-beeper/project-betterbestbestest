import React from "react";
import LoginContainer from "./Login/LoginContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./LoginSignUpPage.css";

const Login = () => {
  return (
    <MuiThemeProvider>
      <LoginContainer />
    </MuiThemeProvider>
  );
};

export default Login;
