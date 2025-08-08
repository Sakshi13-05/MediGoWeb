import { Link } from "react-router-dom";
import { BiSolidLogInCircle } from "react-icons/bi";
import "./Header.css";
import { FaCartArrowDown } from "react-icons/fa6";

function Header({ openLogin, user }) {
  return (
    <header className="header">
      <div className="logo">MediGo</div>

      <nav className="nav-links">
        {user ? (
          <>
            <span><BiSolidLogInCircle />Welcome, {user.name}</span>
            <Link to="/cart">Cart</Link>
            <span className="offers">Offers</span>
          </>
        ) : (
          <>
            <span className="login-btn" onClick={openLogin}><BiSolidLogInCircle />Login</span>
            <Link to="/cart"><span><FaCartArrowDown /></span>Cart</Link>
            <span className="offers">Offers</span>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
