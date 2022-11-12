// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-pxzOJUtfPV4_x0Vhphmce6mciynSJ2A",
  authDomain: "cms-app-9ed7b.firebaseapp.com",
  projectId: "cms-app-9ed7b",
  storageBucket: "cms-app-9ed7b.appspot.com",
  messagingSenderId: "640312251273",
  appId: "1:640312251273:web:29fc67578c328f52644758",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
