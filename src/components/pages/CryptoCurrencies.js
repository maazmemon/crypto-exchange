import React, { useEffect, useState } from "react";
import "./CryptoCurrencies.css";
import { Link } from "react-router-dom";

function CryptoCurrencies({ myStyle, cryptos, setData, mode }) {
  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/hbwm2tpwc01ao")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [setData]);

  const index = {
    zIndex: "1",
    position: "absolute",
  };

  const [border, setBorder] = useState({
    borderBottom: "1px solid black",
  });

  useEffect(() => {
    toggleBorder();
  }, [mode]);

  const toggleBorder = () => {
    if (mode === "Dark Mode") {
      setBorder({ borderBottom: "1px solid #f5f5f5" });
    } else {
      setBorder({ borderBottom: "1px solid black" });
    }
  };

  return (
    <div className="container-crypto" style={{ ...myStyle, ...index }}>
      {cryptos.length > 0 ? (
        <ul className="crypto-list" style={myStyle}>
          <li className="list-header-items" style={{ ...myStyle, ...border }}>
            <div className="list-item">Name</div>
            <div className="list-item">Symbol</div>
            <div className="list-item">Price</div>
            <div className="list-item">24h Change</div>
            <div className="list-item">Market Cap</div>
            <div className="list-item">Circulating Supply</div>
          </li>
          <div className="list-body">
            {cryptos.map((crypto, index) => (
              <Link key={index} to={`/details/${crypto["data.name"]}`}>
                <li
                  className="list-body-items"
                  style={{ ...myStyle, ...border }}
                >
                  <div className="list-item">{crypto["data.name"]}</div>
                  <div className="list-item">{crypto["data.symbol"]}</div>
                  <div className="list-item">
                    ${parseFloat(crypto["data.quote.USD.price"]).toFixed(2)}
                  </div>
                  <div
                    className={`list-item ${
                      parseFloat(crypto["data.quote.USD.percent_change_24h"]) >=
                      0
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {parseFloat(
                      crypto["data.quote.USD.percent_change_24h"]
                    ).toFixed(2)}
                    %
                  </div>
                  <div className="list-item">
                    $
                    {parseInt(
                      crypto["data.quote.USD.market_cap"]
                    ).toLocaleString()}
                  </div>
                  <div className="list-item">
                    {parseInt(
                      crypto["data.circulating_supply"]
                    ).toLocaleString()}{" "}
                    {crypto["data.symbol"]}
                  </div>
                </li>
              </Link>
            ))}
          </div>
        </ul>
      ) : (
        <div className="container-crypto" style={myStyle}>
          <div className="spinner-container">
            <div className="spinner spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CryptoCurrencies;
