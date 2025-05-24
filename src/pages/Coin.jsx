import { useContext, useEffect, useState } from "react";
import "../pages/coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LionChart from "../components/LionChart";
function Coin() {
  const { coinId } = useParams();
  const [coinData, seCoinData] = useState();
  const [historicalcoinData, seHistoricalCoinData] = useState();

  const { currency } = useContext(CoinContext);
  const fetchCoinData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const data = await res.json();
      seCoinData(data);
    } catch (err) {
      console.error("Failed to fetch coin data:", err);
    }
  };
  const fetchHistoricalData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`
      );
      const data = await res.json();
      seHistoricalCoinData(data.prices);
    } catch (err) {
      console.error("Failed to fetch historical data:", err);
    }
  };
  useEffect(
    function () {
      fetchCoinData();
      fetchHistoricalData();
    },
    [currency]
  );
  if ((coinData, historicalcoinData)) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} {""} {coinData.symbol.toUpperCase()}
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LionChart historicalcoinData={historicalcoinData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.symbol}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
}
export default Coin;
