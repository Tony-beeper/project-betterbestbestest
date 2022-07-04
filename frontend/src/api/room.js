import axios from "axios";

const backendURL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080" + "/api/rooms";
const createRoom = async (username) => {
  const data = await axios.post(backendURL, { username: username });
  return data.data;
};

const getRoom = async (roomId) => {
  const data = await axios.get(backendURL + "/" + roomId);
  return data.data;
};

const joinRoom = async (roomNumber, joinCode) => {
  const data = await axios.patch(`${backendURL}/join/`, {
    roomNumber: roomNumber,
    joinCode: joinCode,
  });
  return data.data;
};

const deleteRoom = async (roomId) => {
  const data = await axios.delete(`${backendURL}/${roomId}`);
  return data.data;
};

const roomsAPI = {
  createRoom,
  getRoom,
  joinRoom,
  deleteRoom,
};

export default roomsAPI;
