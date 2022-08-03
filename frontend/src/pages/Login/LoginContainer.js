import React, { useState, useContext, useEffect } from "react";
import LoginForm from "./LoginForm.js";
import userAPI from "../../api/userAPI";
import errorHandler from "../../utils/ErrorHandler";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";

const zxcvbn = require("zxcvbn");

const LoginContainer = () => {
  let [context, setContext] = useContext(ThemeContext);

  let nav = useNavigate();
  const errors = {};
  const [user, setUser] = useState({
    username: "",
    password: "",
    pwconfirm: "",
  });
  const [btnTxt, setBtnTxt] = useState("show");
  const [type, setType] = useState("password");
  const [score, setScore] = useState("0");
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const cookieCheck = document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (cookieCheck) nav("/room");
  });

  const handleChange = (event) => {
    const field = event.target.name;

    switch (field) {
      case "username":
        setUser({ ...user, username: event.target.value });
        break;
      case "password":
        setUser({ ...user, password: event.target.value });
        break;
      case "pwconfirm":
        setUser({ ...user, pwconfirm: event.target.value });
        break;
      default:
    }
  };

  const pwHandleChange = (event) => {
    const field = event.target.name;
    switch (field) {
      case "username":
        setUser({ ...user, username: event.target.value });
        break;
      case "password":
        setUser({ ...user, password: event.target.value });
        break;
      case "pwconfirm":
        setUser({ ...user, pwconfirm: event.target.value });
        break;
      default:
    }

    if (event.target.value === "") {
      setScore("null");
    } else {
      var pw = zxcvbn(event.target.value);
      const newScore = pw.score + 1;
      setScore(newScore);
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setDisable(true);
    userAPI
      .login(user.username, user.password)
      .then((data) => {
        toast.success(data);

        setContext({ username: user.username });

        nav("/room");
      })
      .catch(({ response }) => {
        errorHandler.handleLogin(response);
      })
      .finally(() => {
        setDisable(false);
      });
  };

  return (
    <MuiThemeProvider>
      <div>
        <LoginForm
          onSubmit={submitLogin}
          onChange={handleChange}
          onPwChange={pwHandleChange}
          errors={errors}
          user={user}
          score={score}
          btnTxt={btnTxt}
          type={type}
          disabled={disable}
        />
      </div>
    </MuiThemeProvider>
  );
};
export default LoginContainer;
