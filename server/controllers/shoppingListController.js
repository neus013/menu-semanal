const ShoppingList = require("../models/shoppingList"); // Asegúrate de que la ruta sea correcta

// Obtener todas las listas de compras de un usuario
const getAllShoppingLists = async (req, res) => {
  const { userId } = req.params; // Obtener el userId de los parámetros

  try {
    const shoppingLists = await ShoppingList.find({ userId }).populate(
      "items.ingredient"
    ); // Obtener todas las listas de compras para el usuario
    res.status(200).json(shoppingLists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las listas de compras", error });
  }
};

// Crear una nueva lista de compras
const createShoppingList = async (req, res) => {
  const { userId, week, items } = req.body;

  if (!userId || !week || !items) {
    return res
      .status(400)
      .json({ message: "Usuario, semana e items son obligatorios" });
  }

  try {
    const newShoppingList = new ShoppingList({
      userId,
      week,
      items,
    });
    await newShoppingList.save();
    res.status(201).json(newShoppingList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la lista de compras", error });
  }
};

// Obtener una lista de compras por su ID
const getShoppingListById = async (req, res) => {
  const { id } = req.params;

  try {
    const shoppingList = await ShoppingList.findById(id).populate(
      "items.ingredient"
    );
    if (!shoppingList) {
      return res
        .status(404)
        .json({ message: "Lista de compras no encontrada" });
    }
    res.status(200).json(shoppingList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la lista de compras", error });
  }
};

// Actualizar una lista de compras por su ID
const updateShoppingList = async (req, res) => {
  const { id } = req.params;
  const { week, items } = req.body;

  try {
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      id,
      { week, items },
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedShoppingList) {
      return res
        .status(404)
        .json({ message: "Lista de compras no encontrada" });
    }
    res.status(200).json(updatedShoppingList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la lista de compras", error });
  }
};

// Eliminar una lista de compras por su ID
const deleteShoppingList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedShoppingList = await ShoppingList.findByIdAndDelete(id);
    if (!deletedShoppingList) {
      return res
        .status(404)
        .json({ message: "Lista de compras no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Lista de compras eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la lista de compras", error });
  }
};

module.exports = {
  getAllShoppingLists,
  createShoppingList,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList,
};
