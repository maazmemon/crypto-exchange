import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import "./Header.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import alt from "../alt-image.jpg";

const Header = ({
  setLoginPage,
  user,
  setIsUser,
  emailData,
  toggleBtn,
  btn,
  myStyle,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const startGlowing = () => {
        const signUpButton = document.querySelector(".sign-up");
        if (signUpButton) {
          signUpButton.classList.add("glow");
          setTimeout(() => {
            signUpButton.classList.remove("glow");
          }, 3000); // Glow effect lasts for 3 seconds
        }
      };

      const initialDelay = 10000; // Initial delay of 10 seconds
      const glowInterval = 13000; // 10 seconds off + 3 seconds on = 13 seconds

      const initialTimer = setTimeout(() => {
        startGlowing();
        const interval = setInterval(startGlowing, glowInterval);
        return () => clearInterval(interval);
      }, initialDelay);

      return () => clearTimeout(initialTimer);
    }
  }, [user]);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLoginPage = () => {
    setLoginPage(true);
  };

  const handleLogout = async (e) => {
    e.stopPropagation(); // Prevent event propagation
    try {
      await signOut(auth);
      setIsUser(null);
      navigate("/");
      setIsDropdownVisible(false);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-info")) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const getFirstName = (displayName) => {
    return displayName ? displayName.split(" ")[0] : "";
  };

  return (
    <div className="container-header" style={myStyle}>
      <div className="container1-header" style={myStyle}>
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="container2-header" style={myStyle}>
        <Link style={myStyle} to="/crypto-currencies">
          Cryptocurrencies
        </Link>
        <Link style={myStyle} to="/">
          Exchange
        </Link>
        <Link style={myStyle} to="/">
          Community
        </Link>
        <Link style={myStyle} to="/">
          Product
        </Link>
        <Link style={myStyle} to="/">
          Learn
        </Link>
      </div>
      <div className="container3-header" style={myStyle}>
        {user ? (
          <div className="user-info">
            {user.photoURL ? (
              <img src={user.photoURL} alt={alt} onClick={toggleDropdown} />
            ) : (
              <img src={alt} alt={alt} onClick={toggleDropdown} />
            )}

            {isDropdownVisible && (
              <div
                className="dropdown-menu"
                style={myStyle}
                onClick={(e) => e.stopPropagation()}
              >
                {user.displayName ? (
                  <span>Welcome, {getFirstName(user.displayName)}</span>
                ) : (
                  <span>Welcome, {emailData?.user?.email || "User"}</span>
                )}

                <Link to="/profile" style={myStyle}>
                  Profile
                </Link>
                <Link to="/settings" style={myStyle}>
                  Settings
                </Link>
                <button style={myStyle} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="sign-up" onClick={handleLoginPage}>
            Sign Up
          </button>
        )}
      </div>

      <div className="form-check form-switch m-4" onClick={toggleBtn}>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label className="form-check-label" for="flexSwitchCheckDefault">
          {btn}
        </label>
      </div>
    </div>
  );
};

export default Header;
