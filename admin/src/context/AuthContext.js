import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading";
// import useToken from "../hooks/useToken";
import jwt_decode from "jwt-decode";
import auth from "../utils/firebase.init";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoadingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, name, phone) {
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: name,
      phoneNumber: phone,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
    return user;
  }

  // login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

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
  // const [token] = useToken(currentUser);
  //forget password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    signOut(auth);
    return;
  }
  // logout();
  const value = {
    loading,
    currentUser,
    signup,
    logout,
    login,
    resetPassword,
    axios,
    setLoadingAuth,
    // token,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
