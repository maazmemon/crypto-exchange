import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./CryptoDetails.css";

function CryptoDetails({ cryptos }) {
  const { name } = useParams();
  const crypto = cryptos.find((crypto) => crypto["data.name"] === name);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });
  const [timeFrame, setTimeFrame] = useState("24h");

  useEffect(() => {
    if (crypto) {
      fetchChartData(timeFrame);
    }
  }, [timeFrame, crypto]);

  const fetchChartData = (period) => {
    if (!crypto) return;

    const dataMap = {
      "24h": {
        labels: ["8 AM", "12 PM", "4 PM", "8 PM", "12 AM", "4 AM", "8 AM"],
        data: [58.0, 57.5, 57.2, 57.0, 56.8, 56.5, 56.2],
      },
      "7d": {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [59.0, 58.5, 58.0, 57.5, 57.0, 56.5, 56.0],
      },
      "1m": {
        labels: Array.from({ length: 30 }, (_, i) => i + 1),
        data: Array.from({ length: 30 }, () => Math.random() * 5 + 55),
      },
      "1y": {
        labels: Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("default", { month: "short" })
        ),
        data: Array.from({ length: 12 }, () => Math.random() * 10 + 50),
      },
    };

    setChartData({
      labels: dataMap[period].labels,
      datasets: [
        {
          label: `${crypto["data.name"]} Price`,
          data: dataMap[period].data,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    });
  };

  if (!crypto) {
    return <div>Cryptocurrency not found</div>;
  }

  return (
    <div className="crypto-details-container">
      <div className="crypto-header">
        <h1>
          {crypto["data.name"]} ({crypto["data.symbol"]})
        </h1>
        <p
          className={`price ${
            parseFloat(crypto["data.quote.USD.percent_change_24h"]) >= 0
              ? "text-success"
              : "text-danger"
          }`}
        >
          ${parseFloat(crypto["data.quote.USD.price"]).toFixed(2)}
        </p>
        <p
          className={`percent-change ${
            parseFloat(crypto["data.quote.USD.percent_change_24h"]) >= 0
              ? "text-success"
              : "text-danger"
          }`}
        >
          {parseFloat(crypto["data.quote.USD.percent_change_24h"]).toFixed(2)}%
          (24h)
        </p>
      </div>
      <div className="crypto-stats">
        <div className="stat">
          <p>Market Cap</p>
          <p>
            ${parseInt(crypto["data.quote.USD.market_cap"]).toLocaleString()}
          </p>
        </div>
        <div className="stat">
          <p>Volume (24h)</p>
          <p>
            ${parseInt(crypto["data.quote.USD.volume_24h"]).toLocaleString()}
          </p>
        </div>
        <div className="stat">
          <p>Circulating Supply</p>
          <p>
            {parseInt(crypto["data.circulating_supply"]).toLocaleString()}{" "}
            {crypto["data.symbol"]}
          </p>
        </div>
        <div className="stat">
          <p>Total Supply</p>
          <p>
            {parseInt(crypto["data.total_supply"]).toLocaleString()}{" "}
            {crypto["data.symbol"]}
          </p>
        </div>
      </div>
      <div className="timeframe-buttons">
        <button onClick={() => setTimeFrame("24h")}>24 Hours</button>
        <button onClick={() => setTimeFrame("7d")}>7 Days</button>
        <button onClick={() => setTimeFrame("1m")}>1 Month</button>
        <button onClick={() => setTimeFrame("1y")}>1 Year</button>
      </div>
      <div className="crypto-chart">
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default CryptoDetails;
