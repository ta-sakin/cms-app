import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />}></Route>
      </Routes>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick={true}
        transition={Zoom}
      />
    </div>
  );
}

export default App;

