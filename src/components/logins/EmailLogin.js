import React, { useState } from "react";
import "./EmailLogin.css";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function EmailLogin({ setEmailPage, setLoginPage, setEmailData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnClick = () => {
    setLoginPage(true);
    setEmailPage(false);
  };

  const handleCreateAccount = async () => {
    try {
      const emailUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const data = emailUser;
      setEmailData(data);
      setEmailPage(false);
      setLoginPage(false);
    } catch (error) {
      alert(error);
    }
    alert("We are Creating One for You");
  };

  const handleSignIn = async () => {
    try {
      const emailUser = await signInWithEmailAndPassword(auth, email, password);
      const data = emailUser;
      setEmailData(data);
      setEmailPage(false);
      setLoginPage(false);
    } catch (error) {
      alert(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="container-loginpage">
      <div className="container1-loginpage">
        <h3 className="cancel" onClick={handleOnClick}>
          X
        </h3>
        <div className="container2-loginpage">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <div className="container-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span className="password-toggle" onClick={toggleShowPassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button onClick={handleCreateAccount}>Create Account</button>
          <span className="account" onClick={handleSignIn}>
            Already have an account? Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

export default EmailLogin;
