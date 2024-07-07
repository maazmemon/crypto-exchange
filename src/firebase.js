// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWhFsgkjfsGb5pykOnuC7JYoQt_mxbrI8",
  authDomain: "crypto-exchange-a2450.firebaseapp.com",
  projectId: "crypto-exchange-a2450",
  storageBucket: "crypto-exchange-a2450.appspot.com",
  messagingSenderId: "592236121549",
  appId: "1:592236121549:web:48c8e8face9026fbf38884",
  measurementId: "G-2VXYYE2TL6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
