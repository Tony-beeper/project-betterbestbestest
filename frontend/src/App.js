// <<<<<<< Updated upstream
// import CodeEditor from "./components/CodeEditor/CodeEditor";

// function App() {
//     return (
//         <div className="App">
//             <CodeEditor />
//         </div>
//     );
// =======
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Room from "./pages/Room/Room";
import Bar from "./components/appbar";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/SignUp/Login";

// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import SignUpContainer from "./pages/SignUp/src/SignUpContainer";

function App() {
  return (
    <Router>
      <ToastContainer theme="colored" />
      <Bar />
      <Routes>
        <Route path="/" element={<h1>hello world</h1>} />
        {/* <Route path="/room/" element={<Room />} /> */}
        {/* <Route path="/room/:id" element={<h1>room</h1>} /> */}
        <Route path="/signup/" element={<SignUp />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </Router>
  );
  // >>>>>>> Stashed changes
}

export default App;
