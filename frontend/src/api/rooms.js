import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL + "/api/rooms";
const createRoom = async (username, roomName) => {
  // const data = await axios.post(backendURL, {
  //   username: username,
  //   roomName: roomName,
  //   withCredentials: true,
  // });

  const res = await axios({
    method: "POST",
    url: backendURL,
    headers: {},
    data: {
      username: username,
      roomName: roomName,
    },
    withCredentials: true,
  });

  return res.data;
};

const getRoom = async (roomId) => {
  const data = await axios.get(backendURL + "/" + roomId, {
    withCredentials: true,
  });
  return data.data;
};

const getRooms = async (username) => {
  // const data = await axios.get(`${backendURL}/all/${username}`, {
  //   withCredentials: true,
  // });

  const res = await axios({
    method: "GET",
    url: backendURL + "/all/" + username,
    headers: {},

    withCredentials: true,
  });

  return res.data;
};

const joinRoom = async (roomNumber, joinCode) => {
  const res = await axios({
    method: "PATCH",
    url: backendURL + "/join/",
    headers: {},
    data: { roomNumber: roomNumber, joinCode: joinCode },
    withCredentials: true,
  });

  return res.data;
};

const deleteRoom = async (roomId) => {
  // const data = await axios.delete(`${backendURL}/${roomId}`, {
  //   withCredentials: true,
  // });

  const res = await axios({
    method: "DELETE",
    url: backendURL + "/" + roomId,
    headers: {},

    withCredentials: true,
  });

  return res.data;
};

const leaveRoom = async (roomId) => {
  // const data = await axios.patch(`${backendURL}/leave/`, {
  //   roomId: roomId,
  //   withCredentials: true,
  // });

  const res = await axios({
    method: "PATCH",
    url: backendURL + "/leave/",
    headers: {},
    data: { roomId: roomId },
    withCredentials: true,
  });

  return res.data;
};

const roomsAPI = {
  createRoom,
  getRoom,
  joinRoom,
  deleteRoom,
  getRooms,
  leaveRoom,
};

export default roomsAPI;
