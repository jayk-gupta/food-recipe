
import { FormEvent, useEffect, useState } from "react"
import "./App.css"
import * as api from "./api"
import { Recipe } from "./types"
import RecipeCard from "./components/RecipeCard"
function App() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  
  const handleSearchSubmit = async (e:FormEvent) => {
        e.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm,1)
      setRecipes(recipes.results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    
  },[])
  return (
    <div>
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <input type="text" required placeholder="Enter an item..."
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        >

        </input>
        <button type="submit"> Submit</button>
      </form>

      {recipes.map((recipe) => (
       <RecipeCard recipe={recipe} key={recipe.id}/>
      ))}
    </div>
  );
}

export default App