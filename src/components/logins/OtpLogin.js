import React, { useState } from "react";
import "./OtpLogin.css";
import { auth } from "../../firebase";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function OtpLogin({ setPhonePage, setLoginPage }) {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");

  const sentOtp = async () => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

    try {
      await recaptcha.render();
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation);
      // setSignInDisabled(false);
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await user.confirm(otp);
      setPhonePage(false);
      setLoginPage(false);
    } catch (error) {
      alert("Wrong Otp");
    }
  };

  const backToLogin = () => {
    setLoginPage(true);
    setPhonePage(false);
  };

  return (
    <div className="container-loginpage">
      <div className="container1-loginpage">
        <div className="main-content-otp">
          <h2>OTP Page</h2>
          <div className="input-field-otp">
            <div className="all-inputs">
              <PhoneInput
                className="key"
                country={"us"}
                value={phone}
                onChange={(phone) => setPhone("+" + phone)}
              />
              <button className="buttons send-otp" onClick={sentOtp}>
                SEND OTP
              </button>
              <div id="recaptcha"></div>
              <input
                className="inputs"
                onChange={(e) => setOtp(e.target.value)}
                type=""
                placeholder="Enter OTP"
              />
              <button className="buttons verify-otp" onClick={verifyOtp}>
                VERIFY OTP
              </button>
              <button className="login-button" onClick={backToLogin}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpLogin;

//
