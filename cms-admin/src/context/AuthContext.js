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

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
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
    return signOut(auth);
  }
  // logout();
  const value = {
    loading,
    currentUser,
    signup,
    logout,
    login,
    resetPassword,
    // token,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
