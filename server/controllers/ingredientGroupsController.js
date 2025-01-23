const IngredientGroup = require("../models/ingredientGroups"); // Asegúrate de que la ruta sea correcta

// Obtener todos los grupos de ingredientes
const getAllIngredientGroups = async (req, res) => {
  try {
    const ingredientGroups = await IngredientGroup.find().populate(
      "ingredients"
    ); // Obtener todos los grupos de ingredientes
    res.status(200).json(ingredientGroups);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los grupos de ingredientes", error });
  }
};

// Crear un nuevo grupo de ingredientes
const createIngredientGroup = async (req, res) => {
  const { name, ingredients } = req.body;

  if (!name || !ingredients || !Array.isArray(ingredients)) {
    return res
      .status(400)
      .json({ message: "Nombre y lista de ingredientes son obligatorios" });
  }

  try {
    const newIngredientGroup = new IngredientGroup({ name, ingredients });
    await newIngredientGroup.save();
    res.status(201).json(newIngredientGroup);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el grupo de ingredientes", error });
  }
};

// Obtener un grupo de ingredientes por ID
const getIngredientGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const ingredientGroup = await IngredientGroup.findById(id).populate(
      "ingredients"
    );
    if (!ingredientGroup) {
      return res
        .status(404)
        .json({ message: "Grupo de ingredientes no encontrado" });
    }
    res.status(200).json(ingredientGroup);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el grupo de ingredientes", error });
  }
};

// Actualizar un grupo de ingredientes
const updateIngredientGroup = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients } = req.body;

  try {
    const updatedIngredientGroup = await IngredientGroup.findByIdAndUpdate(
      id,
      { name, ingredients },
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedIngredientGroup) {
      return res
        .status(404)
        .json({ message: "Grupo de ingredientes no encontrado" });
    }
    res.status(200).json(updatedIngredientGroup);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el grupo de ingredientes", error });
  }
};

// Eliminar un grupo de ingredientes
const deleteIngredientGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIngredientGroup = await IngredientGroup.findByIdAndDelete(id);
    if (!deletedIngredientGroup) {
      return res
        .status(404)
        .json({ message: "Grupo de ingredientes no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Grupo de ingredientes eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el grupo de ingredientes", error });
  }
};

module.exports = {
  getAllIngredientGroups,
  createIngredientGroup,
  getIngredientGroupById,
  updateIngredientGroup,
  deleteIngredientGroup,
};
