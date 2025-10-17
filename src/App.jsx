import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHome from "./AppHome";
import RecipeDetails from "./RecipeDetails";
import Favorites from "./Favorites";
import Navbar from "./Navbar";
import AboutDeveloper from "./AboutDeveloper";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<AboutDeveloper />} />

      </Routes>
    </Router>
  );
}

export default App;
