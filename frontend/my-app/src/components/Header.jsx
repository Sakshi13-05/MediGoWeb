import { Link } from "react-router-dom";
import { BiSolidLogInCircle } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa6";
import "./Header.css";

function Header({ openLogin, user, logout }) {
  return (
    <header className="header">
      <div className="logo">MediGo</div>

      <nav className="nav-links">
        {user ? (
          <>
            <span><BiSolidLogInCircle /> Welcome, {user.name}</span>
            <Link to="/cart">Cart</Link>
            <span className="offers">Offers</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <span className="login-btn" onClick={openLogin}><BiSolidLogInCircle /> Login</span>
            <Link to="/cart"><FaCartArrowDown /> Cart</Link>
            <span className="offers">Offers</span>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
