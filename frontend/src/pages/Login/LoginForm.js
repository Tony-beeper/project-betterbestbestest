import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "../LoginSignUpBox.css";
import { Typography, Box, Button, Container, Layout } from "@material-ui/core";

const LoginForm = ({ onSubmit, onChange, errors, user, type, onPwChange }) => {
  return (
    <Container maxWidth="lg">
      <div className="loginBox">
        <Typography variant="h4">Login</Typography>
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <Box
          noValidate
          component="form"
          onSubmit={onSubmit}
          className="signUpForm"
          sx={{ mt: 1 }}
        >
          {/* <form onSubmit={onSubmit} className="signUpForm"> */}
          <TextField
            autoFocus
            required
            fullWidth
            name="username"
            floatingLabelText="Username"
            value={user.username}
            onChange={onChange}
            errorText={errors.username}
            autoComplete="off"
            label="Username"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            type={type}
            name="password"
            floatingLabelText="password"
            value={user.password}
            onChange={onPwChange}
            errorText={errors.password}
            label="Password"
            margin="normal"
          />

          {/* <RaisedButton
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
            Login
          </Button>
          {/* </form> */}
        </Box>
      </div>
    </Container>
  );
};

export default LoginForm;
