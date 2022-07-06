import React, { Component } from "react";
import LoginForm from "./LoginForm.js";
import userAPI from "../../../api/SignUp";
import validateSignUpForm from "./validate";
import errorHandler from "./utils/errhandling";

// const FormValidators = require("./validate");
// const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");
// password strength estimator

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        password: "",
        pwconfirm: "",
      },
      btnTxt: "show",
      type: "password",
      score: "0",
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });

    if (event.target.value === "") {
      this.setState((state) =>
        Object.assign({}, state, {
          score: "null",
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState((state) =>
        Object.assign({}, state, {
          score: pw.score + 1,
        })
      );
    }
  }

  submitSignup(e) {
    e.preventDefault();
    console.log("submitSignup called");
    userAPI
      .login(this.state.user.username, this.state.user.password)
      .then((data) => {
        console.log(data);
        // nevigate(`${data._id}`);
      })
      .catch(({ response }) => {
        console.log(response);
        // setRoomNumber("");
        // setJoinCode("");
        errorHandler.handleLogin(response);
      });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
      var user = {
        usr: this.state.user.username,
        pw: this.state.user.password,
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      console.log(errors);

      this.setState({
        errors,
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState((state) =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show",
      })
    );
  }

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.submitSignup}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

export default LoginContainer;
