import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/user/";

const signup = async (username, password) => {
  console.log(username);
  console.log(password);
  const res = await axios({
    method: "POST",
    url: backendURL + "signup",
    headers: {},
    data: {
      username: username,
      password: password,
    },
    withCredentials: true,
  });

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
