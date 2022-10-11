import React, { Fragment, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import wardsList from "../wardsList";
import OtpInput from "react18-input-otp";
// import OtpForm from "./OtpForm";
import OtpForm from "./OtpForm";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./signupStyle.css";
import auth from "../firebase.init";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function Signup() {
  const [ward, setWard] = useState("");
  const { signInWithPhone } = useAuth();
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [number, setNumber] = useState();
  const [confirmResponse, setConfirmResponse] = useState({});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: number,
    ward: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    ward: "",
    address: "",
    emptyError: "",
  });

  const handleName = (e) => {
    if (e.target.name) {
      setInfo({ ...info, name: e.target.value });
      setErrors({ ...errors, name: "" });
    }
  };
  // const handlePhone = (e) => {
  //   setNumber(e.target.value);
  //   if (e.target.phone) {
  //     setInfo({ ...info, phone: e.target.value });
  //     setErrors({ ...errors, phone: "" });
  //   }
  // };

  const handleEmail = (e) => {
    const verifyEmail = /\S+@\S+\.\S+/.test(e.target.value);
    if (verifyEmail) {
      setInfo({ ...info, email: e.target.value });
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Invalid email" });
      setInfo({ ...info, email: "" });
    }
  };

  // const handleChangeOtp = (enteredOtp) => {
  //   setOtp(enteredOtp);
  // };
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleSignUp();
        },
      },
      auth
    );
  };
  const handleSignUp = async (event) => {
    console.log("load");
    event.preventDefault();
    // setUpRecaptcha();
    // const data = new FormData(event.currentTarget);
    try {
      if (!info.name) {
        setErrors({ ...errors, name: "Enter your name" });
      } else if (!info.email) {
        setErrors({ ...errors, email: "Enter your email" });
      } else if (!number) {
        console.log("phone", number);
        setErrors({ ...errors, phone: "Enter your phone" });
      } else if (!info.ward) {
        setErrors({ ...errors, ward: "Select your ward" });
      } else if (!info.address) {
        setErrors({ ...errors, address: "Enter your address" });
      } else {
        setLoading(true);
        // await signup(info.email, info.password, info.name);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
    // try {
    //   const confirmationResult = await signInWithPhone(data.get("phone"));
    //   console.log(confirmationResult);
    //   if (confirmationResult) {
    //     setShow(true);
    //     setConfirmResponse(confirmationResult);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // setData({
    //   fullName: data.get("fullName"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   phone: data.get("phone"),
    //   ward: ward,
    // });
  };

  // const handleChange = (event) => {
  //   setWard(event.target.value);
  // };
  console.log(show);
  console.log(info);

  return (
    // <div>
    //   <div className={`${show ? "block" : "hidden"}`}>
    //     <OtpForm
    //       confirmationResult={confirmResponse}
    //       signInWithPhone={signInWithPhone}
    //       phone={data.phone}
    //       setUpRecaptcha={setUpRecaptcha}
    //     />
    //   </div>
    //   <div className={`${!show ? "block" : "hidden"}`}>
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
    //                   autoComplete="given-name"
    //                   name="fullName"
    //                   required
    //                   fullWidth
    //                   id="fullName"
    //                   label="Full Name"
    //                   autoFocus
    //                   error={data.fullName === ""}
    //                   helperText={data.fullName === "" ? "Empty field!" : " "}
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   required
    //                   fullWidth
    //                   id="email"
    //                   label="Email Address"
    //                   name="email"
    //                   autoComplete="email"
    //                 />
    //               </Grid>
    //               <Grid item xs={12}>
    // <PhoneInput
    //   defaultCountry="BD"
    //   placeholder="Enter phone number"
    //   value={number}
    //   onChange={setNumber}
    //   className="border-[1px] border-gray-400 hover:border-gray-800 rounded-md py-[16px]"
    //   // style={{ input: { appearance: "none" } }}
    // />
    //                 <TextField
    //                   required
    //                   fullWidth
    //                   id="phone"
    //                   label="Phone Number"
    //                   name="phone"
    //                   autoComplete="phone"
    //                 ></TextField>
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <FormControl fullWidth>
    //                   <InputLabel id="demo-simple-select-label">
    //                     Ward
    //                   </InputLabel>
    // <Select
    //   labelId="demo-simple-select-label"
    //   id="demo-simple-select"
    //   value={ward}
    //   label="ward"
    //   required
    //   onChange={handleChange}
    // >
    //   {Object.keys(wardsList)?.map((key) => (
    //     <MenuItem value={wardsList[key]}>
    //       {wardsList[key]}
    //     </MenuItem>
    //   ))}
    // </Select>
    //                 </FormControl>
    //               </Grid>
    //               <Grid item xs={12}>
    //                 <TextField
    //                   required
    //                   fullWidth
    //                   name="password"
    //                   label="Password"
    //                   type="password"
    //                   id="password"
    //                   autoComplete="new-password"
    //                 />
    //               </Grid>
    //             </Grid>
    // <Button
    //   type="submit"
    //   fullWidth
    //   variant="contained"
    //   style={{
    //     backgroundColor: "black",
    //   }}
    //   sx={{ mt: 3, mb: 2 }}
    // >
    //   Sign Up
    // </Button>
    //             <Grid container justifyContent="flex-end">
    //               <Grid item>
    //                 <Link href="#" variant="body2">
    //                   Already have an account? Sign in
    //                 </Link>
    //               </Grid>
    //             </Grid>
    // <OtpInput
    //   value={otp}
    //   onChange={handleChangeOtp}
    //   numInputs={6}
    //   separator={<span>-</span>}
    //   separateAfter={3}
    // />
    //           </Box>
    //         </Box>
    //         {/* <Copyright sx={{ mt: 5 }} /> */}
    //       </Container>
    //     </ThemeProvider>
    //   </div>
    //   <div id="recaptcha-container"></div>
    // </div>
    <Fragment>
      <div className="max-w-sm mx-auto my-20 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
        <h1 className="text-2xl text-center font-bold mb-3">Sign up</h1>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col space-y-5">
            <label htmlFor="name">
              <p className="text-sm text-slate-700 pb-2">Name</p>
              <input
                onChange={handleName}
                id="name"
                name="name"
                type="name"
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
              {errors?.name && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.name}
                </p>
              )}
            </label>
            <label htmlFor="email">
              <p className="text-sm text-slate-700 pb-2">Email address</p>
              <input
                onChange={handleEmail}
                id="email"
                name="email"
                type="email"
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
              {errors?.email && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.email}
                </p>
              )}
            </label>
            <label htmlFor="phone">
              <p className="text-sm text-slate-700 pb-2">Phone number</p>
              <PhoneInput
                defaultCountry="BD"
                placeholder="Enter phone number"
                value={number}
                onChange={setNumber}
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              />
              {errors?.phone && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.phone}
                </p>
              )}
            </label>
            <label htmlFor="ward">
              <p className="text-sm text-slate-700 pb-2">Ward</p>
              <select
                value={ward}
                label="ward"
                required
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              >
                {Object.keys(wardsList)?.map((key) => (
                  <option value={wardsList[key]}>{wardsList[key]}</option>
                ))}
              </select>
              {errors?.email && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.email}
                </p>
              )}
            </label>
            <label htmlFor="address">
              <p className="text-sm text-slate-700 pb-2">Address</p>
              <input
                onChange={(e) => setInfo(...info, { address: e.target.value })}
                // id="ad"
                name="address"
                type="address"
                className="w-full text-sm py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your address"
              />
              {errors?.address && (
                <p className="text-red-400 text-xs flex items-center">
                  <AiOutlineExclamationCircle className="mr-1" />
                  {errors.address}
                </p>
              )}
            </label>
            {!loading ? (
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <span>SIGN UP</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                disabled
              >
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
              </button>
            )}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span className="font-bold text-sm">Login </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
