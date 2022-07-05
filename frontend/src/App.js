import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddRoom from "./pages/AddRoom/AddRoom";
import Room from "./pages/MyRooms/Room";
import Bar from "./components/appbar";

function App() {
  return (
    <Router>
      <ToastContainer theme="colored" />
      <Bar />
      <Routes>
        <Route path="/" element={<h1>hello world</h1>} />
        <Route path="/room/add/" element={<AddRoom />} />
        <Route path="/room/" element={<Room />} />
        <Route path="/room/:id" element={<h1>room</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
