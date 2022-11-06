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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const captcha = async () => {
      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            // "recaptcha-container",
            { size: "invisible" },
            auth
          );
        }
        await window.recaptchaVerifier.render();
      } catch (error) {
        console.log(error);
      }
    };
    captcha();
  }, []);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("accessToken")) {
        let token = localStorage.getItem("accessToken");
        const { exp } = jwt_decode(token);
        const expirationTime = exp * 1000 - 60000;
        if (Date.now() >= expirationTime) {
          await logout();
          navigate("/login");
          toast.error("Session expired", { theme: "colored" });
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

  const value = {
    loading,
    currentUser,
    logout,
    confirmResponse,
    getVerificationCode,
    captchaResponse,
    setLoadCaptcha,
    loadCaptcha,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
      {/* {children} */}
    </AuthContext.Provider>
  );
}
