const express = require("express");
const {
  getAllShoppingLists,
  createShoppingList,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
} = require("../controllers/shoppingListController");

const router = express.Router();

// Rutas de listas de compras
router.get("/:userId", getAllShoppingLists); // Obtener todas las listas de compras de un usuario
router.post("/", createShoppingList); // Crear una nueva lista de compras
router.get("/:id", getShoppingListById); // Obtener una lista de compras por ID
router.put("/:id", updateShoppingList); // Actualizar una lista de compras por ID
router.delete("/:id", deleteShoppingList); // Eliminar una lista de compras por ID

module.exports = router;
