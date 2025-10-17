import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [favCount, setFavCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavCount(favorites.length);

    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("favorites")) || [];
      if (updated.length !== favCount) {
        setFavCount(updated.length);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 600); 
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location, favCount]);

  return (
    <nav className="navbar">
      <div className="logo">🍳 Recipe Finder</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites" className={animate ? "fav-link bounce" : "fav-link"}>
          ❤️ Favorites ({favCount})
        </Link>
        <Link to="/about">👩🏻 About Developer</Link>

      </div>
    </nav>
  );
}

export default Navbar;
