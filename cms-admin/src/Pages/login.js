import React, { useEffect, useState } from "react";
// import auth from "../utils/firebase.init";
// import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spin from "../components/shared/Spin";
import { toast } from "react-toastify";
import Error from "../components/shared/Error";
import axios from "axios";
import "react-phone-number-input/style.css";
import "./phoneInputStyle.css";
import { useAuth } from "../context/AuthContext";

const defaulValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(defaulValues);
  const [error, setError] = useState("");
  const { email, password } = userInput;
  const navigate = useNavigate();

  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const reset = () => {
    setUserInput(defaulValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Empty field!");
      return;
    } else if (email.includes("@councillor")) {
      createUser("councillor");
    } else if (email.includes("@mayor")) {
      createUser("mayor");
    } else {
      setError("Your email is not authorized");
      return;
    }
    setLoading(true);

    async function createUser(role) {
      try {
        console.log("login");
        const { data } = await axios.get(
          `http://localhost:5000/api/admin/auth/token?email=${email}`
        );
        const info = await login(email, password);
        if (info) {
          if (data.token) {
            localStorage.setItem("accessToken", data.token);
          }
          reset();
          toast.success(`Welcome back ${info.user?.displayName}!`, {
            theme: "colored",
          });
          setLoading(false);
          navigate(from, { replace: true });
        }
      } catch (error) {
        setLoading(false);
        if (
          error.code?.includes("argument") ||
          error.code?.includes("internal")
        ) {
          setError("Something went wrong!");
        } else if (error.code) {
          setError(error.code);
        } else if (error.response?.status === 400) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      }
    }
  };

  return (
    <div>
      <div>
        <div className="sm:max-w-md max-w-sm mx-auto my-20 bg-white rounded-xl shadow-lg shadow-slate-300 py-8 px-8 sm:px-16">
          <h1 className="text-2xl text-center font-bold mb-3">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="text-sm text-slate-700 pb-2">Email address</p>
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email address"
                />
              </label>
              <label htmlFor="password">
                <p className="text-sm text-slate-700 pb-2">Password</p>
                <input
                  onChange={handleChange}
                  value={password}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                  placeholder="Enter your password"
                />
              </label>

              {!loading ? (
                <button
                  type="submit"
                  id="sign-in-button"
                  className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <span>Login</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full mt-4 py-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center disabled"
                  disabled
                >
                  <Spin />
                </button>
              )}
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black font-medium inline-flex space-x-1 items-center"
                >
                  <span className="font-semibold text-sm hover:underline hover:text-indigo-600 ">
                    Register{" "}
                  </span>
                </Link>
              </p>
            </div>
            {error && <Error error={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
