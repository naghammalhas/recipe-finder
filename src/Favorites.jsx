import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (idMeal) => {
    const updated = favorites.filter((f) => f.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="search-container">
      <h1>❤️ My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any recipes yet!</p>
      ) : (
        <div className="meals-grid">
          {favorites.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <Link to={`/recipe/${meal.idMeal}`}>View Details</Link>
              <button
                onClick={() => removeFavorite(meal.idMeal)}
                style={{
                  marginTop: "8px",
                  background: "#ff7043",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
