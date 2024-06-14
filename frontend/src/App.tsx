
import { useEffect, useState } from "react"
import "./App.css"
import * as api from "./api"
function App() {
  const [searchTerm, setSearchTerm] = useState("burgers")
  const [recipes, setRecipes] = useState([])
  
  const handleSearchSubmit = async () => {
    try {
      const recipes = await api.searchRecipes(searchTerm,1)
      setRecipes(recipes);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    
  },[])
  return (
    <div>
      {
        recipes.map((recipe) => <div>
          recipe image location :{recipe.image}
          recpie title : {recipe.title}
        </div>)
      }
    </div>
  )
}

export default App