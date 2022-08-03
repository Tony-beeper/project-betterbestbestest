import React from "react";
import SignUpContainer from "./SignUpContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const SignUp = () => {
  return (
    <MuiThemeProvider>
      <SignUpContainer />
    </MuiThemeProvider>
  );
};

export default SignUp;
