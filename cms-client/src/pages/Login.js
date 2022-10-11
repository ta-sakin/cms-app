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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonSpin from "../components/shared/ButtonSpin";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleChange = (e) => {
    setPhone(e.target.phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) {
      setError("Enter phone number");
    }
  };
  return (
    <div>
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
              <FormControl sx={{ width: "25ch" }}>
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
                    to="/signup"
                    variant="body2"
                    className="text-sm underline mt-1 block hover:text-blue-800"
                  >
                    Don't have an account? Sign up
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
  );
};

export default Login;
