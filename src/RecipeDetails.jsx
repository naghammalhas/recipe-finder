import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

 
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals[0]);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const found = favorites.some((item) => item.idMeal === data.meals[0].idMeal);
        setIsFavorite(found);
      });
  }, [id]);

  
  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
    
      favorites = favorites.filter((item) => item.idMeal !== meal.idMeal);
      setIsFavorite(false);
    } else {
      
      favorites.push(meal);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (!meal) return <p className="loading">Loading recipe details...</p>;

  return (
    <div className="details-container">
      <div className="details-card">
        <Link to="/" className="back-btn">← Back to Search</Link>
        <h1 className="meal-title">{meal.strMeal}</h1>

        <div className="meal-header">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
          <div className="meal-info">
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p>
          </div>
        </div>

        
        <button className="favorite-btn" onClick={toggleFavorite}>
          {isFavorite ? "💔 Remove from Favorites" : "💖 Add to Favorites"}
        </button>

        <h2>🧂 Ingredients</h2>
        <ul className="ingredients-list">
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map((n) => meal[`strIngredient${n}`])
            .filter(Boolean)
            .map((ingredient, i) => (
              <li key={i} className="ingredient-item">{ingredient}</li>
            ))}
        </ul>

        <h2>👩🏻‍🍳 Instructions</h2>
        <p className="instructions">{meal.strInstructions}</p>

        {meal.strYoutube && (
          <div className="video-section">
            <h3>🎥 Watch Tutorial:</h3>
            <iframe
              width="560"
              height="315"
              src={meal.strYoutube.replace("watch?v=", "embed/")}
              title={meal.strMeal}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
