import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.js";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/shared/Header/Navbar";

function App() {
  return (
    <div id="app" className="font-poppins">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <ToastContainer
        className="max-w-32"
        style={{ width: "250px" }}
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick={true}
        transition={Zoom}
      />
    </div>
  );
}

export default App;

