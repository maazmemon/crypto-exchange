import React, { useState, useEffect } from "react";
import "./Home.css";
import mobile from "./mobile.png";
import image1 from "./image1.png";
import image2 from "./image2.png";
import Play from "./Google.svg";
import apple from "./Apple.svg";
import kyc from "./1.svg";
import support from "./2.svg";
import api from "./3.svg";
import t1 from "./t1.svg";
import t2 from "./t2.svg";
import t3 from "./t3.svg";
import t4 from "./t4.svg";
import forbes from "./assets/forbes.svg";
import bw from "./assets/bw business.svg";
import dailyhunt from "./assets/dailyhunt.svg";
import dh from "./assets/dh.svg";
import gadgets from "./assets/gadgets.svg";
import hindu from "./assets/t hindu.svg";
import tet from "./assets/tct.svg";
import tt from "./assets/the telegraph.svg";
import logo from "./logo.png";
function Home({ myStyle, setLoginPage, cryptos, setData }) {
  const images = [forbes, bw, dailyhunt, dh, gadgets, hindu, tet, tt];
  const box = {
    border: "1px solid #c0c9d4",
  };

  // Array of cryptocurrencies
  const cryptocurrencies = [
    "Bitcoin",
    "Ethereum",
    "Ripple",
    "Litecoin",
    "Bitcoin Cash",
    "Cardano",
    "Shiba Inu",
    "Chainlink",
    "Dogecoin",
  ];

  // State to manage the current cryptocurrency index and animation class
  const [currentCryptoIndex, setCurrentCryptoIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("slide-in");

  // Effect to change the cryptocurrency name every 4 seconds with animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("slide-out");
      setTimeout(() => {
        setCurrentCryptoIndex(
          (prevIndex) => (prevIndex + 1) % cryptocurrencies.length
        );
        setAnimationClass("slide-in");
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [cryptocurrencies.length]);

  // Function to handle the login page display
  const handleLoginPage = () => {
    setLoginPage(true);
  };

  const repeatedCryptos = Array(10).fill(cryptos).flat();
  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/hbwm2tpwc01ao")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [setData]);

  return (
    <div className="container-home" style={myStyle}>
      <div className="container1-home">
        <div className="home-content">
          <h1>
            <b>
              India का{" "}
              <span className={`crypto-name ${animationClass}`}>
                {cryptocurrencies[currentCryptoIndex]}
              </span>{" "}
              Exchange
            </b>
          </h1>
          <h2>
            Trusted By <b>15 million+ Indians</b>
          </h2>
          <div className="btn">
            <a href="/" className="link">
              <img src={Play} alt="google-play" />
            </a>
            <a href="/" className="link">
              <img src={apple} alt="apple" />
            </a>
            <button className="signup-home" onClick={handleLoginPage}>
              Sign-Up
            </button>
          </div>
        </div>
        <div className="home-image">
          <img src={mobile} alt="mobile" />
        </div>
      </div>
      <div className="container2-home" style={myStyle}>
        <div className="box1-home" style={{ ...myStyle, ...box }}>
          <h1>
            <b>300+ cryptos</b> to invest in for your next big move
          </h1>
          <h2>Invest in a range of cryptos, the easy way.</h2>
          <img src={image1} alt="image1" />
        </div>
        <div className="box2-home" style={{ ...myStyle, ...box }}>
          <h1>
            <b>India’s best prices,</b> driven by highest liquidity
          </h1>
          <h2> Swift transactions meet unmatched value.</h2>
          <img src={image2} alt="image2" />
        </div>
      </div>
      <div className="container3-home" style={myStyle}>
        {repeatedCryptos.map((crypto, index) => {
          return (
            <div className="animation-home" key={index}>
              <p>{crypto["data.name"].toUpperCase()}</p>
              <p>${parseFloat(crypto["data.quote.USD.price"]).toFixed(2)}</p>
              <p
                className={
                  parseFloat(crypto["data.quote.USD.percent_change_24h"]) >= 0
                    ? "text-success"
                    : "text-danger"
                }
              >
                {parseFloat(
                  crypto["data.quote.USD.percent_change_24h"]
                ).toFixed(2)}
                %
              </p>
            </div>
          );
        })}
      </div>
      <div className="container4-home" style={myStyle}>
        <div className="area1">
          <div className="image1">
            <img src={kyc} alt="kyc" />
          </div>
          <span className="head">KYC - Swift & Compliant</span>
          <p className="body">
            Experience seamless onboarding with swift KYC processes, ensuring
            full compliance with regulations.
          </p>
        </div>
        <div className="area2">
          <div className="image2">
            <img src={support} alt="support" />
          </div>
          <span className="head">24/7 Support</span>
          <p className="body">
            Like a trusted friend, our 24/7 expert support is always there,
            making your crypto investment journey smoother.
          </p>
        </div>
        <div className="area3">
          <div className="image3">
            <img src={api} alt="api" />
          </div>
          <span className="head">Seamless API Trading</span>
          <p className="body">
            Amplify your crypto trading experience with WazirX through seamless
            API integration.
          </p>
        </div>
      </div>
      <div className="container5-home">
        <div className="tag">Your Security Matters</div>
        <div className="seperate">
          <div className="c1">
            <div className="t1">
              <img src={t1} alt="kyc" />
            </div>
            <span className="head">Safekeeping Your Digital Assets</span>
            <p className="body">
              We keep your digital assets safe with an extra layer of security.
            </p>
          </div>

          <div className="c2">
            <div className="t2">
              <img src={t2} alt="kyc" />
            </div>
            <span className="head">2 - Factor Authentication</span>
            <p className="body">
              Double your WazirX account security with 2-factor authentication -
              choose the setup that suits you best.
            </p>
          </div>
          <div className="c3">
            <div className="t3">
              <img src={t3} alt="kyc" />
            </div>
            <span className="head">End-to-End Encryption</span>
            <p className="body">
              We use advanced encryption and follow the highest industry
              standards, ensuring worry-free crypto trading and investment for
              you.
            </p>
          </div>
          <div className="c4">
            <div className="t4">
              <img src={t4} alt="kyc" />
            </div>
            <span className="head">Transparency - Your Right to Know</span>
            <p className="body">
              We don't just talk, we practice it. Explore our transparency
              reports, proof of reserves, and more, because informed users make
              better decisions.
            </p>
          </div>
        </div>
      </div>
      <div className="container6-home">
        <div className="top">IN THE MEDIA</div>
        <div className="all-brands">
          <div className="brands-wrapper">
            {images
              .concat(images)
              .concat(images)
              .map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`brand-${index}`} />
              ))}
          </div>
        </div>
      </div>
      <div className="container7-home">
        <div className="hero-home">
          <div className="hero-img">
            <img src={logo} alt="" />
            <span>Crypto-Exchange</span>
          </div>
        </div>
        <div className="menu-home">
          <div className="menu-item">
            <span className="title-home">About</span>
            <div className="submenu">
              <ul>
                <li>Blog</li>
                <li>Careers</li>
                <li>Announcements</li>
                <li>Media Assets</li>
                <li>Terms Of Use</li>
                <li>Privacy Policy</li>
                <li>AML & CFT Policy Statement</li>
                <li>KYC & PMLA Policy</li>
              </ul>
            </div>
          </div>
          <div className="menu-item">
            <span className="title-home">Services</span>
            <div className="submenu">
              <ul>
                <li>Download</li>
                <li>Corporate Account</li>
                <li>Referral Program</li>
                <li>VIP Customer Program</li>
                <li>WazirX API</li>
                <li>List Your Coin</li>
              </ul>
            </div>
          </div>
          <div className="menu-item">
            <span className="title-home">Support</span>
            <div className="submenu">
              <ul>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Fees</li>
                <li>Security Assets</li>
                <li>Law Enforcement Request</li>
                <li>What Is Bitcoin</li>
              </ul>
            </div>
          </div>
          <div className="menu-item">
            <span className="title-home">Buy Crypto</span>
            <div className="submenu">
              <ul>
                <li> Buy Bitcoin</li>
                <li>Buy Ethereum</li>
                <li>Buy USDT</li>
                <li>Buy Tron</li>
                <li>Buy Matic</li>
                <li>Buy Dogecoin</li>
                <li>Buy SHIB</li>
                <li>Buy Solana</li>
                <li>Buy Cardano</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">© Crypto-Exchange. All rights reserved</footer>
    </div>
  );
}

export default Home;
