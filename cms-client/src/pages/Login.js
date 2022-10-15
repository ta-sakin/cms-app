import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { RecaptchaVerifier } from "firebase/auth";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSpin from "../components/shared/ButtonSpin";
import Error from "../components/shared/Error";
import { useAuth } from "../context/AuthContext";
import auth from "../firebase.init";
import OtpForm from "./OtpForm";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { getVerificationCode, setLoadCaptcha, loadCaptcha } = useAuth();
  const [confirmResponse, setConfirmResponse] = useState("");
  const [show, setShow] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  }, []);

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError("Enter phone number");
      return;
    }
    if ((phone + "")[0] !== "+") {
      setError("Invalid phone! add country code");
      return;
    }
    try {
      setLoading(true);
      async function checkUser() {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/auth/signin",
            { phone: phone }
          );
          return data;
        } catch (error) {
          console.log("error", error.response);
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
      localStorage.setItem("phone", phone);
      toast.info("OTP Sent", {
        theme: "colored",
      });
      setError("");
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
          <OtpForm confirmResponse={confirmResponse} phone={phone} />
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
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <FormControl sx={{ width: "40ch" }}>
                  <TextField
                    variant="outlined"
                    value={phone}
                    onChange={handleChange}
                    required
                    // fullWidth
                    id="phone"
                    label="Phone Number(+880)"
                    name="phone"
                    autoComplete="phone"
                  />
                </FormControl>
                <div id="recaptcha-container"></div>
                {!loading ? (
                  <button
                    type="submit"
                    id="sign-in-button"
                    className="w-full mt-4 py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <span>SIGN IN</span>
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
                      to="/signup"
                      variant="body2"
                      className="text-sm cursor-pointer underline mt-1 block hover:text-blue-800"
                    >
                      Don't have an account? Sign up
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

export default Login;
