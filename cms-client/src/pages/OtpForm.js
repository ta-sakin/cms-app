import { Button } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react18-input-otp";
import { useAuth } from "../context/AuthContext";

const OtpForm = ({ confirmResponse }) => {
  const { setUpRecaptcha } = useAuth();
  const phone = localStorage.getItem("phone");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  console.log("otp sent", confirmResponse);
  // const verifyCode = async () => {
  //   const confirmationResult = await signInWithPhone();
  // };
  const verificationCode = async (confirmResponse) => {
    const result = await confirmResponse.confirm(otp);
    return result.user;
  };
  const handleVerification = async () => {
    if (!otp || (otp + "").length < 6) {
      setError("Invalid otp");
      return;
    }
    try {
      if (confirmResponse) {
        const user = await verificationCode(confirmResponse);
        setError("");
        console.log("user", user);
      }
    } catch (error) {
      setError(error.code);
      console.log("code error", error);
    }
  };
  const resendOtp = async () => {
    try {
      const response = await setUpRecaptcha(phone);
      const user = await verificationCode(response);
      setError("");
      console.log(user);
    } catch (error) {
      if (error.code.includes("argument" || "internal")) {
        setError("Something went wrong!");
      } else {
        setError(error.code);
      }
      window.recaptchaVerifier.render().then(function (widgetId) {
        console.log("widget", widgetId);
        // eslint-disable-next-line no-undef
        grecaptcha.reset(widgetId);
      });
    }
  };
  return (
    <div className="mt-20 max-w-lg py-10 rounded-lg  shadow-lg mx-auto">
      <h4 className="text-3xl text-center">OTP Verification</h4>
      <p className="text-center text-gray-600">
        OTP has been sent to this phone number {phone}
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
          hasErrored={error}
          errorStyle={error ? "border-red-500" : ""}
        />
      </div>
      <div
        id="recaptcha-container"
        className="mt-4 pl-3 max-w-sm mx-auto"
      ></div>

      <div className="flex justify-evenly mt-8 px-2">
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
      </div>
      {error && (
        <div className="bg-red-600 max-w-sm mx-auto mt-4">
          <p className="text-white text-center py-2 capitalize">
            {error?.includes("auth")
              ? error.split("/")[1].split("-").join(" ")
              : error}
          </p>
        </div>
      )}
    </div>
  );
};

export default OtpForm;
