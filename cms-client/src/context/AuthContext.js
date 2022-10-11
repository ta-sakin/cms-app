import {
  onAuthStateChanged,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
// import Loading from "../components/shared/Loading";
import auth from "../firebase.init";
// import useToken from "../hooks/useToken";
// import auth from "../utils/firebase.init";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const provider = new GoogleAuthProvider();
  const [confirmResponse, setConfirmResponse] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const setUpRecaptcha = async (phone) => {
    if (!phone) {
      phone = localStorage.getItem("phone");
    }

    // if (captchaResponse) {
    //   console.log("captcharesponse", captchaResponse);
    //   // captchaResponse.clear();
    //   window.recaptchaVerifier.recaptcha.reset(this.window.recaptchaWidgetId);
    //   document.getElementById("recaptcha-container").innerHTML =
    //     "<div id='recaptcha'></div>";
    //   const recaptchaVerifier = new RecaptchaVerifier(
    //     "recaptcha-container",
    //     {},
    //     auth
    //   );
    //   console.log("set", recaptchaVerifier);
    // }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }
    await window.recaptchaVerifier.render();
    // setConfirmResponse(recaptchaVerifier);
    console.log("recaptch in context insided", window.recaptchaVerifier);
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
    // token,
    // signInWithPhone,
    // verifcationCode,
    confirmResponse,
    setUpRecaptcha,
    captchaResponse,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {loading ? <Loading /> : children} */}
      {children}
    </AuthContext.Provider>
  );
}
