// import React, { useState } from "react";
import "./LoginPage.css";
import google from "./google-logo.png";
import { auth, provider } from "../firebase"; // Adjust the path if needed
import { signInWithPopup } from "firebase/auth";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const LoginPage = ({
  myStyle,
  setLoginPage,
  onUserLogin,
  setEmailPage,
  setPhonePage,
}) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      onUserLogin(user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleOnClick = () => {
    setLoginPage(false);
  };
  const handleEmailPage = () => {
    setEmailPage(true);
    setLoginPage(false);
  };

  const handlePhonePage = () => {
    setPhonePage(true);
    setLoginPage(false);
  };

  return (
    <div className="container-loginpage">
      <div className="container1-loginpage" style={myStyle}>
        <h3 className="cancel" onClick={handleOnClick}>
          X
        </h3>
        <div className="container2-loginpage">
          <h3 className="google" onClick={handleGoogleLogin}>
            <img src={google} alt="Google Logo" />
            <span className="text">Continue with Google</span>
          </h3>
          <h3 className="google" onClick={handleEmailPage}>
            <EmailIcon />
            <span className="text">Continue with Email</span>
          </h3>
          <h3 className="google" onClick={handlePhonePage}>
            <PhoneIcon />
            <span className="text">Continue with Phone</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
