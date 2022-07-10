import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import Bar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import React, { useState } from "react";

export const ThemeContext = React.createContext();
=======
import AddRoom from "./pages/AddRoom/AddRoom";
import Room from "./pages/MyRooms/Room";
import Bar from "./components/appbar";
import NoteBook from "./components/Notebook/Notebook";
>>>>>>> a82536c89babfe08b9ce6d6ac93643aa1ddb2567

function App() {
  const [context, setContext] = useState({
    username: "",
  });
  return (
<<<<<<< HEAD
    <ThemeContext.Provider value={[context, setContext]}>
      <Router>
        <ToastContainer theme="colored" />
        <Bar />
        <Routes>
          <Route path="/" element={<h1>hello world</h1>} />

          <Route path="/signup/" element={<SignUp />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
=======
    <Router>
      <ToastContainer theme="colored" />
      <Bar />
      <Routes>
        <Route path="/" element={<h1>hello world</h1>} />
        <Route path="/room/add/" element={<AddRoom />} />
        <Route path="/room/" element={<Room />} />
        <Route path="/room/:id" element={<NoteBook />} />
      </Routes>
    </Router>
>>>>>>> a82536c89babfe08b9ce6d6ac93643aa1ddb2567
  );
}

export default App;
