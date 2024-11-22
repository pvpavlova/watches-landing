import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" >
          <span className="logo">Xelor</span>
        </Link>
      </div>
      </div>
  );
}
