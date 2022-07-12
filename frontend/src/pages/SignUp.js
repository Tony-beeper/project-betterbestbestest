import React from "react";
import SignUpContainer from "./Signup/SignUpContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./LoginSignUpPage.css";

const SignUp = () => {
  return (
    <MuiThemeProvider>
      <SignUpContainer />
    </MuiThemeProvider>
  );
};

export default SignUp;
