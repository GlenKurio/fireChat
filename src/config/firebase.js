// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeXrW522teUExt3tE8SEUc2silRLFrSXU",
  authDomain: "firechatapp-39922.firebaseapp.com",
  projectId: "firechatapp-39922",
  storageBucket: "firechatapp-39922.appspot.com",
  messagingSenderId: "771540604081",
  appId: "1:771540604081:web:c75f0e7b38e6333a64be90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
