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
import "./signupStyle.css";
import auth from "../firebase.init";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ButtonSpin from "../components/shared/ButtonSpin";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});
const defaulValues = {
  fullName: "",
  email: "",
  phone: "",
  ward: "",
  address: "",
};
const Register = () => {
  const { captchaResponse, setUpRecaptcha, signInWithPhone } = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(defaulValues);
  const { fullName, email, phone, ward, address } = userInput;
  const [error, setError] = useState("");
  const [confirmResponse, setConfirmResponse] = useState("");
  let recaptchaWrapperRef = useRef();
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phone, ward, address } = userInput;
    if (
      fullName === "" ||
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
    localStorage.setItem("phone", phone);
    // https://stackoverflow.com/questions/51285008/firebase-recaptchaverifier-clear-has-no-effect/51328808#51328808
    // https://stackoverflow.com/questions/63806396/how-to-reset-recaptcha-on-success-for-signinwithphonenumber
    try {
      setLoading(true);
      const confirmationResult = await setUpRecaptcha(phone);
      setLoading(false);
      setConfirmResponse(confirmationResult);
      setShow(true);
      console.log(confirmationResult);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error?.code?.includes("argument" || "internal")) {
        setError("Something went wrong!");
      } else {
        setError(error.code);
      }
      window.recaptchaVerifier.render().then(function (widgetId) {
        console.log("widget", widgetId);
        // eslint-disable-next-line no-undef
        grecaptcha.reset(widgetId);
      });
      // captchaResponse.clear();
    }
  };

  return (
    <div>
      <div className={`${show ? "block" : "hidden"}`}>
        {confirmResponse && <OtpForm confirmResponse={confirmResponse} />}
      </div>

      <div className={`${!show ? "block" : "hidden"}`}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/* <LockOutlinedIcon /> */}
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={fullName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      name="fullName"
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      autoFocus
                      //   error={errorInput.fullName === ""}
                      //   helperText={
                      //     errorInput.fullName === "" ? "Empty field!" : " "
                      //   }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={email}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      //   error={errorInput.email === ""}
                      //   helperText={
                      //     errorInput.email === "" ? "Empty field!" : " "
                      //   }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <PhoneInput
                      defaultCountry="BD"
                      placeholder="Enter phone number"
                      value={number}
                      onChange={setNumber}
                    //   className="border-[1px] border-gray-400 hover:border-gray-800 rounded-md py-[16px]"
                      // style={{ input: { appearance: "none" } }}
                    /> */}

                    <TextField
                      value={phone}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number(+880)"
                      name="phone"
                      autoComplete="phone"
                      //   error={errorInput.phone === ""}
                      //   helperText={
                      //     errorInput.phone === "" ? "Empty field!" : " "
                      //   }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Ward
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ward}
                        label="ward"
                        name="ward"
                        required
                        onChange={handleChange}
                        // error={errorInput.ward === ""}
                        // helperText={
                        //   errorInput.ward === "" ? "Empty field!" : " "
                        // }
                      >
                        {Object.keys(wardsList)?.map((key) => (
                          <MenuItem value={wardsList[key]}>
                            {wardsList[key]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={address}
                      onChange={handleChange}
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      type="Address"
                      id="Address"
                      //   autoComplete="address"
                      //   error={errorInput.address === ""}
                      //   helperText={
                      //     errorInput.address === "" ? "Empty field!" : " "
                      //   }
                    />
                  </Grid>
                </Grid>
                <div id="recaptcha-container"></div>
                {/* <div ref={(ref) => (recaptchaWrapperRef = ref)}>
                </div> */}
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
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      to="/login"
                      variant="body2"
                      className="text-sm underline mt-1 block hover:text-blue-800"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {error && (
              <div className="bg-red-600 mt-4">
                <p className="text-white text-center py-2 capitalize">
                  {error.includes("auth")
                    ? error.split("/")[1].split("-").join(" ")
                    : error}
                </p>
              </div>
            )}
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Register;
