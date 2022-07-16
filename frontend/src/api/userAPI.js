import axios from "axios";
// axios.defaults.withCredentials = true;
const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/user/";

const signup = async (username, password) => {
  console.log(username);
  console.log(password);
  //   const json = JSON.stringify({ username, password });

  //   const res = await axios.post(backendURL + "signup", json, {
  //     headers: {
  //       // Overwrite Axios's automatically set Content-Type
  //       "Content-Type": "application/json",
  //     },
  //   });

  const res = await axios({
    method: "POST",
    url: backendURL + "signup",
    headers: {},
    data: {
      username: username,
      password: password, // This is the body part
    },
    withCredentials: true,
  });

  //   res.data.data; // '{"answer":42}'
  //   res.data.headers["Content-Type"]; // 'application/json',

  return res.data;
};

const login = async (username, password) => {
  const res = await axios({
    method: "POST",
    url: backendURL + "login",
    headers: {},
    data: {
      username: username,
      password: password,
    },
    withCredentials: true,
  });

  return res.data;
};

const userAPI = {
  signup,
  login,
};

export default userAPI;
