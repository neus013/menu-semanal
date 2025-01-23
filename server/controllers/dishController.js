
const Dish = require("../models/dish");

// Obtener todos los platos
const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate("ingredients.ingredient"); // Incluye información detallada de los ingredientes
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los platos", error });
  }
};

// Crear un nuevo plato
const createDish = async (req, res) => {
  const { name, type, ingredients } = req.body;

  if (!name || !type) {
    return res
      .status(400)
      .json({ message: "El nombre y el tipo son obligatorios" });
  }

  try {
    const newDish = new Dish({
      name,
      type,
      ingredients, // [{ item: ingredientId, quantity: number }]
    });

    await newDish.save();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el plato", error });
  }
};

// Obtener un plato por ID
const getDishById = async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findById(id)
      .populate("ingredients.ingredient")
      .populate("foodRestrictions");
    if (!dish) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el plato", error });
  }
};

// Actualizar un plato
const updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, type, ingredients, foodRestrictions } = req.body;

  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { name, type, ingredients, foodRestrictions },
      { new: true, runValidators: true }
    )
      .populate("ingredients.ingredient")
      .populate("foodRestrictions");

    if (!updatedDish) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el plato", error });
  }
};

// Eliminar un plato
const deleteDish = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDish = await Dish.findByIdAndDelete(id);
    if (!deletedDish) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }

    res.status(200).json({ message: "Plato eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el plato", error });
  }
};

module.exports = {
  getAllDishes,
  createDish,
  getDishById,
  updateDish,
  deleteDish,
};
