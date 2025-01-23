const mongoose = require("mongoose");

// Esquema de ingrediente
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nombre del ingrediente (por ejemplo, "Pollo", "Lechuga")
  },
  type: {
    type: String,
    required: true, // Tipo de ingrediente (por ejemplo, "Carne", "Verdura")
    enum: [
      "carn blanca",
      "carn vermella",
      "verdura",
      "hortalisa",
      "fruita",
      "cereal",
      "peix",
      "espècia",
      "llegum",
    ],
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;
