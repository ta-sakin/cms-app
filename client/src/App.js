import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Signup from "./pages/Signup.js";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/shared/Header/Navbar";
import SubmitComplain from "./pages/SubmitComplain";
import PrivateRoute from "./components/Auth/PrivateRoute";
import MyComplain from "./pages/MyComplain";
import Profile from "./pages/Profile";

function App() {
  return (
    <div id="app" className="font-montserrat">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home />
            // <PrivateRoute>
            // </PrivateRoute>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <Home />
            // <PrivateRoute>
            // </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/submitcomplain"
          element={
            <SubmitComplain />
            // <PrivateRoute>
            // </PrivateRoute>
          }
        ></Route>
        <Route
          path="/mycomplain"
          element={
            <PrivateRoute>
              <MyComplain />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <Register />
            // <PublicRoute>
            // </PublicRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login />
            // <PublicRoute>
            // </PublicRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick={true}
        transition={Zoom}
        theme="colored"
        // className="!h-10"
        // style={{ height: "20px !important" }}
      />
    </div>
  );
}

export default App;
