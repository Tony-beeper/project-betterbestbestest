import React from "react";
// import TextField from "material-ui/TextField";
import "../LoginSignUpBox.css";
import { Box, Container, ThemeProvider } from "@material-ui/core";
import CodeBookButton from "../../components/Buttons/CodeBookButton";
import { createTheme } from "@material-ui/core/styles";
import WhiteTextField from "../../components/StyledMuiComponents/WhiteTextField";
import WhiteTextTypography from "../../components/StyledMuiComponents/WhiteTypography";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e3f2fd",
    },
  },
});

const LoginForm = ({ onSubmit, onChange, errors, user, type, onPwChange }) => {
  return (
    <Container maxWidth="lg">
      <div className="loginBox">
        <WhiteTextTypography variant="h4">
          Sign in to CodeBook
        </WhiteTextTypography>
        {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        <ThemeProvider theme={theme}>
          <Box noValidate component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <WhiteTextField
              autoFocus
              required
              name="username"
              floatingLabelText="Username"
              value={user.username}
              onChange={onChange}
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
              type={type}
              name="password"
              floatingLabelText="password"
              value={user.password}
              onChange={onPwChange}
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

            <CodeBookButton>Sign in</CodeBookButton>
          </Box>
        </ThemeProvider>
      </div>
    </Container>
  );
};

export default LoginForm;
