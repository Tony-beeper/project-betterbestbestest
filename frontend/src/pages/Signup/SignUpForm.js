import React from "react";
import FlatButton from "material-ui/FlatButton";
import PasswordStr from "./PasswordStr";
import "../LoginSignUpBox.css";
import { Box, Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import WhiteTextTypography from "../../components/StyledMuiComponents/WhiteTypography";
import CodeBookButton from "../../components/Buttons/CodeBookButton";
import WhiteTextField from "../../components/StyledMuiComponents/WhiteTextField";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e3f2fd",
    },
  },
});

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange,
}) => {
  return (
    <Container maxWidth="lg">
      <div className="loginBox">
        <WhiteTextTypography variant="h4">Sign up</WhiteTextTypography>
        {/* <ThemeProvider theme={theme}> */}
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

        <Box
          // noValidate
          component="form"
          onSubmit={onSubmit}
          className="signUpForm"
          sx={{ mt: 1 }}
        >
          <WhiteTextField
            autoFocus
            required
            type={type}
            name="username"
            floatingLabelText="Username"
            value={user.username}
            onChange={onChange}
            error={errors === ""}
            helperText={errors === "" ? "" : errors.username}
            autoComplete="off"
            label="Username"
            margin="normal"
            multiline
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <br />
          <WhiteTextField
            required
            autoFocus
            type={type}
            name="password"
            floatingLabelText="password"
            value={user.password}
            onChange={onPwChange}
            error={errors === ""}
            helperText={errors === "" ? "" : errors.password}
            label="Password"
            margin="normal"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <br />
          <div className="pwStrRow">
            {score >= 1 && (
              <div>
                <PasswordStr score={score} />
                <FlatButton
                  className="pwShowHideBtn"
                  label={btnTxt}
                  onClick={pwMask}
                  style={{
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "whitesmoke",
                  }}
                />
              </div>
            )}
          </div>
          <WhiteTextField
            required
            autoFocus
            type={type}
            name="pwconfirm"
            floatingLabelText="Confirm Password"
            value={user.pwconfirm}
            onChange={onChange}
            label="Confirm Password"
            margin="normal"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
            error={errors === ""}
            helperText={errors === "" ? "" : errors.pwconfirm}
          />
          <br />
          <CodeBookButton>Sign Up</CodeBookButton>
        </Box>
        <WhiteTextTypography className="elmt">
          Aleady have an account? <br />
          <a href="/login" color="white">
            Log in here
          </a>
        </WhiteTextTypography>
      </div>
    </Container>
  );
};

export default SignUpForm;
