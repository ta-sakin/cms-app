import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "react18-input-otp";
import ButtonSpin from "../components/shared/ButtonSpin";
import Error from "../components/shared/Error";
import { useAuth } from "../context/AuthContext";
import auth from "../firebase.init";
import useToken from "../hooks/useToken";

const OtpForm = ({ confirmResponse, name, phone }) => {
  const { getVerificationCode } = useAuth();
  const [response, setResponse] = useState(confirmResponse);
  const userData = JSON.parse(localStorage.getItem("userData"));

  phone = localStorage.getItem("phone");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const verificationCode = async (response) => {
    const result = await response.confirm(otp);
    return result.user;
  };
  const [token] = useToken(userData?.phone || phone);

  const handleVerification = async () => {
    if (!otp || (otp + "").length < 6) {
      setError("invalid verification code");
      return;
    }
    setLoading(true);
    try {
      if (response) {
        const user = await verificationCode(response);
        if (name && user) {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          const register = async () => {
            try {
              const response = await axios.post(
                "http://localhost:5000/auth/signup",
                userData
              );
              return response;
            } catch (error) {
              if (error.response.status >= 400) {
                setError(error.response.data.message);
              }
              setLoading(false);
              return;
            }
          };
          await register();
        }
        if (token && user) {
          userData && localStorage.removeItem("userData");
          phone && localStorage.removeItem("phone");
          localStorage.setItem("accessToken", token);
          navigate("/");
        }
        setLoading(false);
        setError("");
      }
    } catch (error) {
      setLoading(false);
      setError(error.code);
    }
  };

  const resendOtp = async () => {
    try {
      setError("");
      setOtp("");
      setLoading(true);
      const res = await getVerificationCode(userData?.phone || phone);
      toast.info("OTP Sent", {
        theme: "colored",
      });
      setResponse(res);
      setLoading(false);
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
    }
  };
  return (
    <div className="mt-20 max-w-lg py-10 rounded-lg  shadow-lg mx-auto">
      <h4 className="text-2xl text-center mt-5">Enter Verification Code</h4>
      <p className="text-center text-gray-600 text-sm">
        OTP has been sent to this phone number {userData?.phone || phone}
      </p>
      <div className="flex justify-center items-center mt-8">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span style={{ width: "8px" }}></span>}
          isInputNum={true}
          shouldAutoFocus={true}
          inputStyle="border-2 !w-[54px] rounded-md h-[54px] px-6 text-[#000] font-bold "
          focusStyle="border-2 border-[#000] outline-none"
          hasErrored={error?.includes("invalid")}
          errorStyle={error ? "border-red-500" : ""}
        />
      </div>
      <div id="recaptcha-container"></div>

      <div className="flex justify-evenly mt-8 px-2">
        {!loading ? (
          <>
            <button
              className="text-center text-gray-700 px-10 py-2 border-2 hover:bg-[#000]  hover:text-white rounded-md "
              onClick={resendOtp}
            >
              Resend OTP
            </button>
            <button
              className="text-center px-10 bg-[#000] py-2 text-white rounded-md "
              onClick={handleVerification}
            >
              Verify
            </button>
          </>
        ) : (
          <>
            <ButtonSpin />
            {/* <CircularProgress color="inherit" /> */}
          </>
        )}
      </div>
      <div className="px-16">{error && <Error error={error} />}</div>
    </div>
  );
};

export default OtpForm;
