import axios from "axios";

const backendURL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080" + "/api/rooms";
const createRoom = async (username, roomName) => {
  const data = await axios.post(backendURL, {
    username: username,
    roomName: roomName,
  });
  return data.data;
};

const getRoom = async (roomId) => {
  const data = await axios.get(backendURL + "/" + roomId);
  return data.data;
};

const getRooms = async (username) => {
  const data = await axios.get(`${backendURL}/all/${username}`);
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
  getRooms,
};

export default roomsAPI;
