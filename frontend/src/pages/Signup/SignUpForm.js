import React from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
import "../LoginSignUpBox.css";
import { Typography, Box, Button, Container, Layout } from "@material-ui/core";

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
        <Typography variant="h4">Sign up</Typography>
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

        <Box
          noValidate
          component="form"
          onSubmit={onSubmit}
          className="signUpForm"
          sx={{ mt: 1 }}
        >
          <TextField
            name="username"
            floatingLabelText="user name"
            value={user.username}
            onChange={onChange}
            errorText={errors.username}
          />
          <TextField
            type={type}
            name="password"
            floatingLabelText="password"
            value={user.password}
            onChange={onPwChange}
            errorText={errors.password}
          />
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
                  }}
                />
              </div>
            )}
          </div>
          <TextField
            type={type}
            name="pwconfirm"
            floatingLabelText="confirm password"
            value={user.pwconfirm}
            onChange={onChange}
            errorText={errors.pwconfirm}
          />
          {/* <br />
          <RaisedButton
            className="signUpSubmit"
            primary={true}
            type="submit"
            label="submit"
          /> */}
          <Button
            className="signUpSubmit"
            size="large"
            primary={true}
            type="submit"
            variant="contained"
            label="submit"
            sx={{ mt: 3, mb: 2 }}
            style={{
              borderRadius: 35,
              backgroundColor: "#b8b4ae",
              padding: "18px 36px",
              fontSize: "18px",
            }}
          >
            Sign Up
          </Button>
        </Box>
        {/* <p>
          Aleady have an account? <br />
          <a href="/login">Log in here</a>
        </p> */}
      </div>
    </Container>
  );
};

export default SignUpForm;
