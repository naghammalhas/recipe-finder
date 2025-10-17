import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function AppHome() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setSuggestions([]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

 
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.meals ? data.meals.slice(0, 5) : []);
        });
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="app">
      <h1>🍳 Recipe Finder</h1>

      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((meal) => (
            <li key={meal.idMeal} onClick={() => {
              setQuery(meal.strMeal);
              setSuggestions([]);
            }}>
              {meal.strMeal}
            </li>
          ))}
        </ul>
      )}

      
      {loading && <div className="loader"></div>}

      
      <div className="meals-grid">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="meal-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <Link to={`/recipe/${meal.idMeal}`}>View Details</Link>
          </div>
        ))}
      </div>

    
      {!loading && meals.length === 0 && query && (
        <p style={{ marginTop: "20px", color: "#999" }}>No recipes found 🍽️</p>
      )}
    </div>
  );
}

export default AppHome;
