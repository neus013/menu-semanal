const express = require("express");
const {
  getAllMenus,
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const router = express.Router();

// Rutas de menús
router.get("/:user", getAllMenus); // Obtener todos los menús de un usuario
router.post("/", createMenu); // Crear un menú nuevo
router.get("/:id", getMenuById); // Obtener un menú por ID
router.put("/:id", updateMenu); // Actualizar un menú por ID
router.delete("/:id", deleteMenu); // Eliminar un menú por ID

module.exports = router;

