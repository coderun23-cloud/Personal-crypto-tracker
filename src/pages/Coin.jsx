import { useContext, useEffect, useState } from "react";
import "../pages/coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LionChart from "../components/LionChart";
import { useNavigate } from "react-router-dom";

function Coin() {
  const { coinId } = useParams();
  const [coinData, seCoinData] = useState();
  const [historicalcoinData, seHistoricalCoinData] = useState();
  const { currency } = useContext(CoinContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  // Only render if both data are loaded
  if (!coinData || !historicalcoinData) return null;

  return (
    <div className="coin">
      <button className="go-back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} {coinData.symbol.toUpperCase()}
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
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>
            {currency.symbol}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Coin;
