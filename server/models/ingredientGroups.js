const mongoose = require("mongoose");

// Esquema de alimentos intercambiables
const ingredientGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Tipo de alimento
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient", // Referencia a los documentos en la colección de ingredientes
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Última modificación
  },
}, { timestamps: true }); // Timestamps para createdAt y updatedAt


const IngredientGroup = mongoose.model(
  "IngredientGroup",
  ingredientGroupSchema
);
module.exports = IngredientGroup;
