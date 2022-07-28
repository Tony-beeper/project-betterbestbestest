import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/github";

const getToken = async (code) => {
  const res = await axios({
    method: "POST",
    url: backendURL + "/oauth",
    headers: {},
    data: {
      code: code,
    },
    withCredentials: true,
  });
  return res.data;
};

const getRepos = async () => {
  const res = await axios({
    method: "GET",
    url: backendURL + "/repos",
    headers: {},
    data: {},
    withCredentials: true,
  });
  return res.data;
};

const writeFile = async (owner, repo, path, message, content) => {
  const res = await axios({
    method: "POST",
    url: backendURL + `/repos/${owner}/${repo}/`,
    headers: {},
    data: { message: message, content: content, path: path },
    withCredentials: true,
  });

  return res.data;
};

const githubAPI = {
  getToken,
  getRepos,
  writeFile,
};

export default githubAPI;
