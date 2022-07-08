import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import React, { useState } from "react";

export const ThemeContext = React.createContext();

function App() {
  const [context, setContext] = useState({
    username: "",
  });
  return (
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
  );
}

export default App;
