// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAesQoCCzdWcsgtTnRW7PE9Esajdmg1cUE",
  authDomain: "app-develop-dcffb.firebaseapp.com",
  projectId: "app-develop-dcffb",
  storageBucket: "app-develop-dcffb.firebasestorage.app",
  messagingSenderId: "1081840280182",
  appId: "1:1081840280182:web:709a095d1ef72c29937557",
  measurementId: "G-ME3XBY2FME"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);