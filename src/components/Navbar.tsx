import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
// import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { isLogin, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img
            src="/img/teguhdev_color.png"
            alt="Teguh Dev"
            className="brand-logo"
          />
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav className={`nav-menu ${menuOpen ? "nav-menu-open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/tentang" onClick={closeMenu}>
            Tentang
          </NavLink>

          <NavLink to="/project" onClick={closeMenu}>
            Project
          </NavLink>

          <NavLink to="/kontak" onClick={closeMenu}>
            Kontak
          </NavLink>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
