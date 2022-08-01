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
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CreditsPage from "./pages/CreditsPage/CreditsPage";
export const ThemeContext = React.createContext();

const theme = createTheme({
  palette: {
    primary: { main: "#21262d" },
    secondary: { main: "#238636" },
    // success: { main: "blue" },
    info: {
      main: "#faff01",
    },
    // success: { main: "#faff01" },
  },
});

function App() {
  const [context, setContext] = useState({
    username: document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ),
  });

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={[context, setContext]}>
        <Router>
          <ToastContainer theme="colored" />
          <Bar />
          <Routes>
            <Route path="/room/add/" element={<AddRoom />} />
            <Route path="/room/" element={<Room />} />
            <Route path="/room/:id" element={<NoteBook />} />
            <Route path="/signup/" element={<SignUp />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
