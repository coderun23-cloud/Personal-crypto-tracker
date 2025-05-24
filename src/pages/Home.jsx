import { useContext, useEffect, useState } from "react";
import "../pages/home.css";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";
function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCOin] = useState([]);
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    const value = e.target.value;
    if (e.target.value === "") {
      setDisplayCOin(allCoin);
    }
    setInput(value);

    const filtered = allCoin.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );

    setDisplayCOin(value ? filtered : allCoin); // show all if input is empty
  };

  useEffect(
    function () {
      setDisplayCOin(allCoin);
    },
    [allCoin]
  );
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Lagerst <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace.Sign up to
          explore more about cryptos
        </p>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="search crypto..."
            required
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Capital</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <>
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>

              <div>
                <img src={item.image} alt="" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p>
                {currency.symbol}
                {item.current_price.toLocaleString()}
              </p>
              <p
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {Math.floor(item.price_change_percentage_24h * 10) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol}
                {item.market_cap.toLocaleString()}
              </p>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default Home;
