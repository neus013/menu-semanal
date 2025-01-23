const express = require("express");
const {
  getAllDishes,
  createDish,
  getDishById,
  updateDish,
  deleteDish,
} = require("../controllers/dishController");

const router = express.Router();

// Rutas para los platos
router.get("/", getAllDishes); // Obtener todos los platos
router.post("/", createDish); // Crear un nuevo plato
router.get("/:id", getDishById); // Obtener un plato por ID
router.put("/:id", updateDish); // Actualizar un plato por ID
router.delete("/:id", deleteDish); // Eliminar un plato por ID

module.exports = router;
