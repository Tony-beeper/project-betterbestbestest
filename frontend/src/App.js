import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import React, { useState } from "react";
import AddRoom from "./pages/AddRoom/AddRoom";
import Room from "./pages/MyRooms/Room";
import NoteBook from "./pages/Notebook/Notebook";
import HomePage from "./pages/HomePage/HomePage";
export const ThemeContext = React.createContext();

function App() {
  const [context, setContext] = useState({
    username: document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ),
  });

  return (
    <ThemeContext.Provider value={[context, setContext]}>
      <Router>
        <ToastContainer theme="colored" />
        <Bar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/add/" element={<AddRoom />} />
          <Route path="/room/" element={<Room />} />
          <Route path="/room/:id" element={<NoteBook />} />
          <Route path="/signup/" element={<SignUp />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
