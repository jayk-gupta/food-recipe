import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recpie-api";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("app is running");
  res.send("app is running");
});

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  res.json(results);
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
