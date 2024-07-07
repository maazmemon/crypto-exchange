import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import EmailLogin from "./components/logins/EmailLogin";
import OtpLogin from "./components/logins/OtpLogin";
import CryptoCurrencies from "./components/pages/CryptoCurrencies";
import CryptoDetails from "./components/pages/CryptoDetails";

function App() {
  const [loginPage, setLoginPage] = useState(false);
  const [isUser, setIsUser] = useState(null);
  const [emailPage, setEmailPage] = useState(false);
  const [emailData, setEmailData] = useState(null);
  const [phonePage, setPhonePage] = useState(false);
  const [btn, setBtn] = useState("Light Mode");
  const [myStyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "#f0f2f5",
  });
  const [cryptos, setData] = useState([]);

  const toggleBtn = () => {
    if (myStyle.color === "black") {
      setMyStyle({
        color: "#f0f2f5",
        backgroundColor: "black",
      });
      setBtn("Dark Mode");
    } else {
      setMyStyle({
        color: "black",
        backgroundColor: "#f0f2f5",
      });
      setBtn("Light Mode");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleUserLogin = (user) => {
    setIsUser(user);
    setLoginPage(false);
  };

  return (
    <div className="App" style={myStyle}>
      <Header
        btn={btn}
        toggleBtn={toggleBtn}
        myStyle={myStyle}
        setMyStyle={setMyStyle}
        setLoginPage={setLoginPage}
        setIsUser={setIsUser}
        user={isUser}
        emailData={emailData}
      />
      {loginPage && (
        <LoginPage
          myStyle={myStyle}
          setPhonePage={setPhonePage}
          emailPage={emailPage}
          setEmailPage={setEmailPage}
          onUserLogin={handleUserLogin}
          setLoginPage={setLoginPage}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              myStyle={myStyle}
              setLoginPage={setLoginPage}
              cryptos={cryptos}
              setData={setData}
            />
          }
        />
        <Route
          path="/crypto-currencies"
          element={
            <CryptoCurrencies
              mode={btn}
              myStyle={myStyle}
              cryptos={cryptos}
              setData={setData}
            />
          }
        />
        <Route
          path="/details/:name"
          element={<CryptoDetails cryptos={cryptos} />}
        />
      </Routes>
      {emailPage && (
        <EmailLogin
          setLoginPage={setLoginPage}
          setEmailPage={setEmailPage}
          setEmailData={setEmailData}
        />
      )}
      {phonePage && (
        <OtpLogin setPhonePage={setPhonePage} setLoginPage={setLoginPage} />
      )}
    </div>
  );
}

export default App;
