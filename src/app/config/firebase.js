import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaeConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "revents-40946.firebaseapp.com",
  projectId: "revents-40946",
  storageBucket: "revents-40946.appspot.com",
  messagingSenderId: "898029719479",
  appId: "1:898029719479:web:7270fa122c1157b4336232",
  measurementId: "G-EY367TFT8G",
};

firebase.initializeApp(firebaeConfig);
firebase.firestore();

export default firebase;
