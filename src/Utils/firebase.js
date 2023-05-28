// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage}from 'firebase/storage'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATr0eSZ-Zy7180C5trQuCcF0ngkXFYkp4",
  authDomain: "hirelane-ce3b2.firebaseapp.com",
  projectId: "hirelane-ce3b2",
  storageBucket: "hirelane-ce3b2.appspot.com",
  messagingSenderId: "663502813633",
  appId: "1:663502813633:web:c76ecb8b68ce3a79dc1740",
  measurementId: "G-WXMPJ43LG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const storage=getStorage(app)
 export const auth=getAuth(app)