import React from "react";
import SignUpContainer from "./src/Signup/SignUpContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./srcIndex.css";

const SignUp = () => {
  return (
    <MuiThemeProvider>
      <SignUpContainer />
    </MuiThemeProvider>
  );
};

export default SignUp;
