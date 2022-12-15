import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/Auth/PublicRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Home from "./Pages/Dashboard/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PageNotFound from "./components/shared/PageNotFound";
import ManageUser from "./Pages/Dashboard/ManageUser";
import ManageComplains from "./Pages/Dashboard/ManageComplains";
import UserDetails from "./Pages/Dashboard/UserDetails";
import ComplainDetails from "./Pages/Dashboard/ComplainDetails";
import Login from "./Pages/login";
import Reports from "./Pages/Dashboard/Reports";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard" element={<Home />}></Route>
          <Route path="/muser" element={<ManageUser />}></Route>
          <Route path="/muser/:id" element={<UserDetails />}></Route>
          <Route path="/mcomplains" element={<ManageComplains />}></Route>
          <Route path="/mcomplains/:id" element={<ComplainDetails />}></Route>
          <Route path="/reports/" element={<Reports />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick={true}
        transition={Zoom}
        theme="colored"
      />
    </div>
  );
}

export default App;
