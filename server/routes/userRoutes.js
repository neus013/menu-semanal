const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAuthenticatedUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware para verificar el token del login

const router = express.Router();

// Rutas de usuarios
router.get("/", getAllUsers); //Obtener todos los usuarios creados
router.post("/register", registerUser); // Registrar un nuevo usuario
router.post("/login", loginUser); // Iniciar sesión de un usuario
router.get("/me", authMiddleware, getAuthenticatedUser); // Obtener el usuario con el token (para el login)
router.get("/:userId", getUserById); // Obtener los detalles de un usuario por ID
router.put("/:userId", updateUser); // Actualizar los detalles de un usuario
router.delete("/:userId", deleteUser); // Eliminar un usuario por ID

module.exports = router;

