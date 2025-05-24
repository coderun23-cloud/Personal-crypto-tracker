import "../components/NavBar.css";
import logo from "../assets/logo.png";
import icon from "../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";
function NavBar() {
  const { setCurrency } = useContext(CoinContext);
  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "gbp":
        setCurrency({ name: "gbp", symbol: "£" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
    }
  };
  return (
    <div className="navbar">
      <Link to={"/"}>
        {" "}
        <img src={logo} alt=" " className="logo" />
      </Link>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option>
        </select>

        <button>
          Sign up <img src={icon} alt="" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
