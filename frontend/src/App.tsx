import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe,setSElectedRecipe] = useState<Recipe|undefined>()
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <input
          type="text"
          required
          placeholder="Enter an item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button type="submit"> Submit</button>
      </form>

      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} onClick={() => setSElectedRecipe(recipe)}/>
      ))}
      <button className="view-more-btn" onClick={handleViewMore}>
        View More
      </button>
      {selectedRecipe ? <RecipeModal/> : null}
    </div>
  );
}

export default App;
