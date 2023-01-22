import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Error from "../components/shared/Error";
import axios from "axios";
import wardsList from "../wardsList";
import "react-phone-number-input/style.css";
import "./phoneInputStyle.css";
import PhoneInput from "react-phone-number-input";
import { useAuth } from "../context/AuthContext";
import ButtonSpin from "../components/shared/ButtonSpin";
const defaulValues = {
  name: "",
  email: "",
  ward: "",
  password: "",
};

const Register = () => {
  const { currentUser: user, signup, setLoadingAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(defaulValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { name, email, ward, password } = userInput;
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const reset = () => {
    setUserInput(defaulValues);
    setPhone("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      ward === "" ||
      password === ""
    ) {
      setError("Empty field!");
      return;
    } else if (email.includes("councillor@")) {
      createUser("councillor");
    } else if (email.includes("mayor@")) {
      createUser("mayor");
    } else {
      setError("Your email is not authorized");
      return;
    }
    setLoading(true);

    async function createUser(role) {
      try {
        const { data } = await axios.post("admin/auth/create", {
          name,
          email,
          phone,
          ward,
          role,
        });
        if (data.token) {
          localStorage.setItem("accessToken", data.token);
          await signup(email, password, name, phone);
          toast.success(`Welcome ${name}!`, {
            theme: "colored",
          });
          reset();
          setLoading(false);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setLoadingAuth(false);
        if (error.code?.includes("auth")) {
          localStorage.removeItem("accessToken");
        }
        if (
          error.code?.includes("argument") ||
          error.code?.includes("internal")
        ) {
          setError("Something went wrong!");
        } else if (error.response?.status === 400) {
          setError(error.response?.data.message);
        } else if (error.message) {
          setError(error.message);
        } else {
          setError(error.code);
        }
      }
    }
  };

  return (
    <div>
      <div className="text-center font-bold bg-[#e5e7eb] p-5">WELCOME TO ADMIN PANEL</div>
      <div>
        <div className="sm:max-w-md max-w-sm mx-auto my-20 bg-white rounded-xl border-2 py-8 px-8 sm:px-16">
          <h1 className="text-2xl text-center font-bold mb-3">
            Admin Registration
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="name">
                <p className="text-sm text-slate-700 pb-2">Name</p>
                <input
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="name"
                  value={name}
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter name"
                />
              </label>
              <label htmlFor="email">
                <p className="text-sm text-slate-700 pb-2">Email</p>
                <input
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter email"
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
                  autoComplete="new-password"
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                  placeholder="Enter your password"
                />
              </label>
              <label htmlFor="phone">
                <p className="text-sm text-slate-700 pb-2">Phone</p>
                <PhoneInput
                  international
                  defaultCountry="BD"
                  placeholder="Enter phone number"
                  name="phone"
                  value={phone}
                  onChange={setPhone}
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                />
              </label>
              <label htmlFor="ward">
                <p className="text-sm text-slate-700 pb-2">Ward</p>
                <select
                  value={ward}
                  label="ward"
                  onChange={handleChange}
                  name="ward"
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                >
                  <option defaultValue="">Choose here</option>
                  {Object.keys(wardsList)?.map((key) => (
                    <option key={key} value={wardsList[key]}>
                      {wardsList[key]}
                    </option>
                  ))}
                </select>
              </label>

              {!loading ? (
                <button
                  type="submit"
                  id="sign-in-button"
                  className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <span>REGISTER</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full mt-4 py-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center disabled"
                  disabled
                >
                  <ButtonSpin />
                </button>
              )}
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black font-medium inline-flex space-x-1 items-center"
                >
                  <span className="font-semibold text-sm hover:underline hover:text-indigo-600 ">
                    Login{" "}
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

export default Register;
