import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/room";
const createRoom = async (username) => {
  const data = await axios.post(backendURL, { username: username });
  return data.data;
};

const roomsAPI = {
  createRoom,
};

export default roomsAPI;
