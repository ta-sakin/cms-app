import {
  onAuthStateChanged,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/shared/Loading";
// import Loading from "../components/shared/Loading";
import auth from "../firebase.init";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { SERVER_URL } from "../helper/constant";

// import useToken from "../hooks/useToken";
// import auth from "../utils/firebase.init";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [loadCaptcha, setLoadCaptcha] = useState(true);
  const provider = new GoogleAuthProvider();
  const [confirmResponse, setConfirmResponse] = useState();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  //check if recaptcha is already present
  useEffect(() => {
    const captcha = async () => {
      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            { size: "invisible" },
            auth
          );
        }
        await window.recaptchaVerifier.render();
      } catch (error) {
        // console.log(error);
      }
    };
    captcha();
  }, []);

  //if jwt expires logout user and remove token
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("accessToken")) {
        let token = localStorage.getItem("accessToken");
        const { exp } = jwt_decode(token);
        const expirationTime = exp * 1000 - 60000; //exp:22th-11:09pm
        if (Date.now() >= expirationTime) {
          await logout();
          navigate("/login");
          toast.error("Session expired", { theme: "colored" });
          window.location.reload();
        }
      }
    })();
  });

  const getVerificationCode = async (phone) => {
    if (!phone) {
      phone = localStorage.getItem("phone");
    }
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );
    return confirmationResult;
  };

  function logout() {
    localStorage.removeItem("accessToken");
    return signOut(auth);
  }
  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data } = await axios.post(
          `${SERVER_URL}/api/user/auth/signin`,
          {
            phone: currentUser?.phoneNumber,
          }
        );
        setUserId(data.user._id);
      } catch (error) {
        // console.log(error);
      }
    };
    getUserId();
  }, [currentUser?.phoneNumber]);

  const value = {
    loading,
    currentUser,
    logout,
    confirmResponse,
    getVerificationCode,
    captchaResponse,
    setLoadCaptcha,
    loadCaptcha,
    userId,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
}
