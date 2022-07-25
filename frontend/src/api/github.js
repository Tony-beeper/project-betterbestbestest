import axios from "axios";
const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
const redirect_uri = process.env.REDIRECT_URL;
const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/oauth";

const requestLogin = async (roomId) => {
  const redirect_uri = `redirect_uri=${redirect_uri}${roomId}`;
  const scope = "scope=repo";
};
