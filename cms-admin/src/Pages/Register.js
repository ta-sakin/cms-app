import React, { useEffect, useState } from "react";
// import auth from "../utils/firebase.init";
// import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Spin from "../components/shared/Spin";
import { toast } from "react-toastify";
import Error from "../components/shared/Error";
import axios from "axios";
import wardsList from "../wardsList";
import "react-phone-number-input/style.css";
import "./phoneInputStyle.css";
import PhoneInput from "react-phone-number-input";
import { useAuth } from "../context/AuthContext";
const defaulValues = {
  name: "",
  email: "",
  phone: "",
  ward: "",
  password: "",
};

const Register = () => {
  const { signup } = useAuth();
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
        await signup(email, password, name);
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/createadmin",
          { name, email, phone, ward, role }
        );
        console.log(data);
        setLoading(false);
      } catch (error) {
        // if (error.response.status === 400) {
        //   setError(error.response.data.message);
        // }
        setLoading(false);
        if (
          error.code?.includes("argument") ||
          error.code?.includes("internal")
        ) {
          setError("Something went wrong!");
        } else if (error.message) {
          console.log(error.message);
          setError(error.message);
        } else {
          setError(error.code);
        }
      }
    }
  };

  return (
    <div>
      <div>
        <div className="sm:max-w-md max-w-sm mx-auto my-20 bg-white rounded-xl shadow-lg shadow-slate-300 py-8 px-8 sm:px-16">
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
                  placeholder="Enter email address"
                />
              </label>
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
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                  placeholder="Enter your password"
                />
              </label>
              <label htmlFor="phone">
                <p className="text-sm text-slate-700 pb-2">Phone number</p>
                <PhoneInput
                  defaultCountry="BD"
                  placeholder="Enter phone number"
                  name="name"
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
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
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
                  <Spin />
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
