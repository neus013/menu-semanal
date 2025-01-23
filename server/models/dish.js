const mongoose = require("mongoose");

// Esquema de plato
const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nombre del plato
  },
  type: {
    type: String,
    required: true,
    enum: ["esmorzar", "mig matí", "dinar", "berenar", "sopar"], // Tipo de comida predefinido
  },
  description: {
    type: String,
    default: "", // Descripción del plato
  },
  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient", // Referencia al modelo Ingredient
        required: true,
      },
      quantity: {
        type: Number,
        required: true, // Cantidad del ingrediente para ese plato
      },
      unit: {
        type: String,
        required: true,
        enum: ["ud", "g", "mg", "l", "ml"], // Unidades predefinidas
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Fecha de última actualización
  },
}, { timestamps: true }); // Timestamps para createdAt y updatedAt

const Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;
