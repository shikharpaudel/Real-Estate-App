// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-state-dd599.firebaseapp.com",
  projectId: "e-state-dd599",
  storageBucket: "e-state-dd599.appspot.com",
  messagingSenderId: "427297611947",
  appId: "1:427297611947:web:6dc6af3c3447025cce57ee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);