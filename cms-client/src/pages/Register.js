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
import { toast } from "react-toastify";
import Error from "../components/shared/Error";
import axios from "axios";

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
  const { getVerificationCode, currentUser, setLoadCaptcha, loadCaptcha } =
    useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState(defaulValues);
  const { fullName, email, phone, ward, address } = userInput;
  const [error, setError] = useState("");
  const [confirmResponse, setConfirmResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  }, []);

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
    const userData = JSON.stringify({
      name: fullName,
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
            "http://localhost:5000/auth/checkUser",
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
    <div>
      <div className={`${show ? "block" : "hidden"}`}>
        {confirmResponse && (
          <OtpForm
            confirmResponse={confirmResponse}
            name={userInput.fullName}
          />
        )}
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
                      autoComplete="name"
                      name="fullName"
                      required
                      fullWidth
                      id="fullname"
                      label="Full Name"
                      autoFocus
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={phone}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number(+880)"
                      name="phone"
                      autoComplete="phone"
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
                    />
                  </Grid>
                </Grid>
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
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      to="/signin"
                      variant="body2"
                      className="text-sm cursor-pointer underline mt-1 block hover:text-blue-800"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {error && <Error error={error} />}
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Register;
