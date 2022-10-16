import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import wardsList from "../wardsList";
import OtpInput from "react18-input-otp";
// import OtpForm from "./OtpForm";
import OtpForm from "./OtpForm";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./phoneInputStyle.css";
import auth from "../firebase.init";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ButtonSpin from "../components/shared/ButtonSpin";
import { toast } from "react-toastify";
import Error from "../components/shared/Error";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});
const defaulValues = {
  name: "",
  email: "",
  phone: "",
  ward: "",
  address: "",
};
const Register = () => {
  const { getVerificationCode, currentUser, setLoadCaptcha, loadCaptcha } =
    useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(defaulValues);
  const [error, setError] = useState("");
  const [confirmResponse, setConfirmResponse] = useState("");
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const { name, email, ward, address } = userInput;

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("set");
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       { size: "invisible" },
  //       auth
  //     );
  //   }, 500);
  // }, []);

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, ward, address } = userInput;
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      ward === "" ||
      address === ""
    ) {
      setError("Empty field!");
      return;
    }
    if ((phone + "")[0] !== "+") {
      setError("Invalid phone! add country code");
      return;
    }

    setError("");
    const userData = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      ward: ward,
      address: address,
    });
    try {
      setLoading(true);
      async function checkUser() {
        try {
          const { data } = await axios.post(
            "https://cms-server-production.up.railway.app/auth/checkUser",
            { phone: phone }
          );
          return data;
        } catch (error) {
          if (error.response.status === 400) {
            setError(error.response.data.message);
          }
          setLoading(false);
          return;
        }
      }
      const data = await checkUser();
      if (!data) return;
      const confirmationResult = await getVerificationCode(phone);
      localStorage.setItem("userData", userData);

      toast.info("OTP Sent", {
        theme: "colored",
      });
      setLoading(false);
      setConfirmResponse(confirmationResult);
      setShow(true);
    } catch (error) {
      setLoading(false);
      if (error?.code?.includes("argument" || "internal")) {
        setError("Something went wrong!");
      } else {
        setError(error.code);
      }
      window.recaptchaVerifier.render().then(function (widgetId) {
        // eslint-disable-next-line no-undef
        grecaptcha.reset(widgetId);
      });
      // captchaResponse.clear();
    }
  };
  return (
    // <div>
    // <div className={`${show ? "block" : "hidden"}`}>
    //   {confirmResponse && (
    //     <OtpForm
    //       confirmResponse={confirmResponse}
    //       name={userInput.name}
    //     />
    //   )}
    // </div>

    // <div className={`${!show ? "block" : "hidden"}`}>
    //     <ThemeProvider theme={theme}>
    //       <Container component="main" maxWidth="xs">
    //         <CssBaseline />
    //         <Box
    //           sx={{
    //             marginTop: 8,
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //             {/* <LockOutlinedIcon /> */}
    //           </Avatar>
    //           <Typography component="h1" variant="h5">
    //             Sign up
    //           </Typography>
    //           <Box
    //             component="form"
    //             noValidate
    //             onSubmit={handleSubmit}
    //             sx={{ mt: 3 }}
    //           >
    //             <Grid container spacing={2}>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   value={name}
    //                   onChange={handleChange}
    //                   autoComplete="name"
    //                   name="name"
    //                   required
    //                   fullWidth
    //                   id="name"
    //                   label="Full Name"
    //                   autoFocus
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   value={email}
    //                   onChange={handleChange}
    //                   required
    //                   fullWidth
    //                   id="email"
    //                   label="Email Address"
    //                   name="email"
    //                   autoComplete="email"
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   value={phone}
    //                   onChange={handleChange}
    //                   required
    //                   fullWidth
    //                   id="phone"
    //                   label="Phone Number(+880)"
    //                   name="phone"
    //                   autoComplete="phone"
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <FormControl fullWidth>
    //                   <InputLabel id="demo-simple-select-label">
    //                     Ward
    //                   </InputLabel>
    //                   <Select
    //                     labelId="demo-simple-select-label"
    //                     id="demo-simple-select"
    //                     value={ward}
    //                     label="ward"
    //                     name="ward"
    //                     required
    //                     onChange={handleChange}
    //                   >
    //                     {Object.keys(wardsList)?.map((key) => (
    //                       <MenuItem value={wardsList[key]}>
    //                         {wardsList[key]}
    //                       </MenuItem>
    //                     ))}
    //                   </Select>
    //                 </FormControl>
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   value={address}
    //                   onChange={handleChange}
    //                   required
    //                   fullWidth
    //                   name="address"
    //                   label="Address"
    //                   type="Address"
    //                   id="Address"
    //                 />
    //               </Grid>
    //             </Grid>
    //             <div id="recaptcha-container"></div>
    // {!loading ? (
    //   <button
    //     type="submit"
    //     id="sign-in-button"
    //     className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center"
    //   >
    //     <span>SIGN UP</span>
    //   </button>
    // ) : (
    //   <button
    //     type="submit"
    //     className="w-full mt-4 py-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center disabled"
    //     disabled
    //   >
    //     <ButtonSpin />
    //   </button>
    // )}
    //             <Grid container justifyContent="flex-end">
    //               <Grid item>
    //                 <Link
    //                   to="/signin"
    //                   variant="body2"
    //                   className="text-sm cursor-pointer underline mt-1 block hover:text-blue-800"
    //                 >
    //                   Already have an account? Sign in
    //                 </Link>
    //               </Grid>
    //             </Grid>
    //           </Box>
    //         </Box>
    // {error && <Error error={error} />}
    //         {/* <Copyright sx={{ mt: 5 }} /> */}
    //       </Container>
    //     </ThemeProvider>
    //   </div>
    // </div>
    <div>
      <div className={`${show ? "block" : "hidden"}`}>
        {confirmResponse && (
          <OtpForm confirmResponse={confirmResponse} name={userInput.name} />
        )}
      </div>

      <div className={`${!show ? "block" : "hidden"}`}>
        <div className="max-w-sm mx-auto my-20 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
          <h1 className="text-2xl text-center font-bold mb-3">Register</h1>
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
                  required
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                >
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  {Object.keys(wardsList)?.map((key) => (
                    <option value={wardsList[key]}>{wardsList[key]}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="address">
                <p className="text-sm text-slate-700 pb-2">Address</p>
                <input
                  onChange={handleChange}
                  value={address}
                  name="address"
                  type="address"
                  id="address"
                  className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow placeholder:text-sm  "
                  placeholder="Enter your address"
                />
              </label>
              <div id="recaptcha-container"></div>

              {!loading ? (
                <button
                  type="submit"
                  id="sign-in-button"
                  className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <span>SIGN UP</span>
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
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span className="font-bold text-sm hover:underline">
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
