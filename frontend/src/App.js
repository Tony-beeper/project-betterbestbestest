import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Room from "./pages/Room";

function App() {
  return (
    <Router>
      <ToastContainer theme="colored" />
      <Routes>
        <Route path="/" element={<h1>hello world</h1>} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
