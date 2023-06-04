 import { initializeApp } from "firebase/app";
 import { getStorage}from 'firebase/storage'
import {getAuth} from 'firebase/auth'
 
 const firebaseConfig = {
  apiKey: "AIzaSyATr0eSZ-Zy7180C5trQuCcF0ngkXFYkp4",
  authDomain: "hirelane-ce3b2.firebaseapp.com",
  projectId: "hirelane-ce3b2",
  storageBucket: "hirelane-ce3b2.appspot.com",
  messagingSenderId: "663502813633",
  appId: "1:663502813633:web:c76ecb8b68ce3a79dc1740",
  measurementId: "G-WXMPJ43LG2"
};

 const app = initializeApp(firebaseConfig);
  export const storage=getStorage(app)
 export const auth=getAuth(app)