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
router.post("/", getIngredientById); // Obtener un ingrediente 
router.post("/", updateIngredient); // Actualizar un ingrediente
router.post("/", deleteIngredient); //Eliminar un ingrediente

module.exports = router;

