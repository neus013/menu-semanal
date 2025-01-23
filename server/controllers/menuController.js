const Menu = require("../models/menu"); // Asegúrate de que la ruta sea correcta

// Obtener todos los menús de un usuario
const getAllMenus = async (req, res) => {
  const { userId } = req.params; // Obtener el userId de los parámetros

  try {
    const menus = await Menu.find({ userId })
      .populate("days.meals.plannedDish")
      .populate("userId"); // Obtener todos los menús para el usuario
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los menús", error });
  }
};

// Crear un menú nuevo
const createMenu = async (req, res) => {
  const { userId, week, days } = req.body;

  if (!userId || !week || !days) {
    return res
      .status(400)
      .json({ message: "Usuario, semana y días son obligatorios" });
  }

  try {
    const newMenu = new Menu({
      userId,
      week,
      days,
    });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el menú", error });
  }
};

// Obtener un menú por su ID
const getMenuById = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findById(id)
      .populate("days.meals.plannedDish")
      .populate("userId");
    if (!menu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el menú", error });
  }
};

// Actualizar un menú por su ID
const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { week, days } = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { week, days },
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el menú", error });
  }
};

// Eliminar un menú por su ID
const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenu = await Menu.findByIdAndDelete(id);
    if (!deletedMenu) {
      return res.status(404).json({ message: "Menú no encontrado" });
    }
    res.status(200).json({ message: "Menú eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el menú", error });
  }
};

module.exports = {
  getAllMenus,
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
};
