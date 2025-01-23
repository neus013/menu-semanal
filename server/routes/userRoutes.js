const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Rutas de usuarios
router.post("/register", registerUser); // Registrar un nuevo usuario
router.post("/login", loginUser); // Iniciar sesión de un usuario
router.get("/:userId", getUserById); // Obtener los detalles de un usuario por ID
router.put("/:userId", updateUser); // Actualizar los detalles de un usuario
router.delete("/:userId", deleteUser); // Eliminar un usuario por ID

module.exports = router;
