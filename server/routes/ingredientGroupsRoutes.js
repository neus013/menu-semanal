const express = require("express");
const {
  getAllIngredientGroups,
  createIngredientGroup,
  getIngredientGroupById,
  updateIngredientGroup,
  deleteIngredientGroup,
} = require("../controllers/ingredientGroupsController");

const router = express.Router();

// Rutas de grupos de ingredientes
router.get("/", getAllIngredientGroups); // Obtener todos los grupos de ingredientes
router.post("/", createIngredientGroup); // Crear un grupo de ingredientes
router.get("/:id", getIngredientGroupById); // Obtener un grupo de ingredientes por ID
router.put("/:id", updateIngredientGroup); // Actualizar un grupo de ingredientes por ID
router.delete("/:id", deleteIngredientGroup); // Eliminar un grupo de ingredientes por ID

module.exports = router;
