const express = require("express");
const {
  getAllIngredients,
  createIngredient,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

const router = express.Router();

// Rutas de ingredientes
router.get("/", getAllIngredients); // Obtener todos los ingredientes
router.post("/", createIngredient); // Crear un ingrediente nuevo
router.get("/:id", getIngredientById); // Obtener un ingrediente 
router.put("/:id", updateIngredient); // Actualizar un ingrediente
router.delete("/:id", deleteIngredient); //Eliminar un ingrediente

module.exports = router;

