import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/piston";

const execute = async (content) => {
  const res = await axios({
    method: "POST",
    url: backendURL,
    headers: {},
    data: {
      content: content,
    },
  });
  return res.data;
};

const pistonAPI = {
  execute,
};

export default pistonAPI;
