import React, { useState, useContext, useEffect } from "react";
import LoginForm from "./LoginForm.js";
import userAPI from "../../../api/userAPI";
import errorHandler from "../../../utils/errorHandler";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../App";

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

  // useEffect(() => {
  //   setUser(...user, { username: context.username });
  // }, [context]);
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
    userAPI
      .login(user.username, user.password)
      .then((data) => {
        toast.success(data);

        setContext({ username: user.username });

        nav("/room");
      })
      .catch(({ response }) => {
        console.log(response);
        errorHandler.handleLogin(response);
      })
      .finally(() => {
        console.log(context);
      });
  };

  const pwMask = (event) => {
    event.preventDefault();

    btnTxt === "show" ? setBtnTxt("hide") : setBtnTxt("show");
    type === "password" ? setType("input") : setType("password");
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
          pwMask={pwMask}
        />
      </div>
    </MuiThemeProvider>
  );
};
export default LoginContainer;
