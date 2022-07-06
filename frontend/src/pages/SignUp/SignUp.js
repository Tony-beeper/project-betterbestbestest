import React from "react";
import SignUpContainer from "./src/SignUpContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../../index.css";

const SignUp = () => {
  return (
    <MuiThemeProvider>
      <SignUpContainer />
    </MuiThemeProvider>
  );
};

export default SignUp;
