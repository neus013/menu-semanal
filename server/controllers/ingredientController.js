const Ingredient = require("../models/ingredient");

// Obtener todos los ingredientes
const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find(); // Obtener todos los documentos de la colección
    res.status(200).json(ingredients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los ingredientes", error });
  }
};

// Crear un ingrediente nuevo
const createIngredient = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "Nombre y tipo son obligatorios" });
  }

  try {
    const newIngredient = new Ingredient({ name, type });
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el ingrediente", error });
  }
};

// Obtener un ingrediente por ID
const getIngredientById = async (req, res) => {
  const { id } = req.params;

  try {
    const ingredient = await Ingredient.findById(id)
    if (!ingredient) {
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el ingrediente", error });
  }
};

// Actualizar un ingrediente
const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      id,
      { name, type },
      { new: true, runValidators: true }
    )

    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    }

    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el ingrediente", error });
  }
};

// Eliminar un plato
const deleteIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(id);
    if (!deletedIngredient) {
      return res.status(404).json({ message: "Ingrediente no encontrado" });
    }

    res.status(200).json({ message: "Ingrediente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el ingrediente", error });
  }
};



module.exports = { getAllIngredients, createIngredient, getIngredientById, updateIngredient, deleteIngredient };

