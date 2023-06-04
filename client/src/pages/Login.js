import axios from "axios";
import { RecaptchaVerifier } from "firebase/auth";

import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSpin from "../components/shared/ButtonSpin";
import Error from "../components/shared/Error";
import { useAuth } from "../context/AuthContext";
import auth from "../firebase.init";
import { SERVER_URL } from "../helper/constant";
import OtpForm from "./OtpForm";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { getVerificationCode } = useAuth();
  const [confirmResponse, setConfirmResponse] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) {
      setError("Enter phone number");
      return;
    }
    try {
      setLoading(true);
      async function checkUser() {
        try {
          const { data } = await axios.post(
            `${SERVER_URL}/api/user/auth/signin`,
            {
              phone: phone,
            }
          );
          return data;
        } catch (error) {
          if (error.message === "Network Error") {
            toast.info(
              "Server is on free tier, might take few seconds to make first request. If you are stuck, please refresh the page.",
              {
                theme: "colored",
                autoClose: 4500,
              }
            );
          }
          if (error?.response?.status === 400) {
            setError(error?.response?.data?.message);
          }
          setLoading(false);
          return;
        }
      }

      const data = await checkUser();
      if (!data) return;
      const confirmationResult = await getVerificationCode(phone);
      setConfirmResponse(confirmationResult);
      localStorage.setItem("phone", phone);
      toast.info("OTP Sent", {
        theme: "colored",
      });
      setError("");
      setLoading(false);
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
            phone={phone}
            authState={"login"}
          />
        )}
      </div>
      <div className={`${!show ? "block" : "hidden"}`}>
        <div className="mx-2">
          <div className="sm:max-w-md max-w-sm mx-auto my-10 bg-white rounded-xl border-2 py-8 px-8 sm:px-16">
            <h1 className="text-2xl text-center font-bold mb-1">
              Citizen Login
            </h1>
            <p className="text-xs text-center text-[#334155] mb-10">
              We will send you an OTP shortly.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-3">
                <label htmlFor="phone">
                  <p className="text-sm text-slate-700 pb-2">
                    Phone Verification
                  </p>

                  <PhoneInput
                    international
                    defaultCountry="BD"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    className="border-[1px] p-2 border-gray-400 hover:border-gray-800 rounded-md py-[16px]"
                    // style={{ input: { appearance: "none" } }}
                  />
                </label>
                <div id="recaptcha-container"></div>
                {!loading ? (
                  <button
                    type="submit"
                    id="sign-in-button"
                    className="w-full py-2 font-medium text-white bg-black hover:bg-gray-900 rounded-lg border-gray-900 hover:shadow inline-flex space-x-2 items-center justify-center"
                  >
                    <span>LOGIN</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center disabled"
                    disabled
                  >
                    <ButtonSpin />
                  </button>
                )}
                <p className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-black font-medium inline-flex space-x-1 items-center"
                  >
                    <span className="font-semibold text-sm hover:underline hover:text-indigo-600">
                      Register Now{" "}
                    </span>
                  </Link>
                </p>
              </div>
              {error && <Error error={error} />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
