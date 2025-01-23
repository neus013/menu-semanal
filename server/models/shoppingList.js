const mongoose = require("mongoose");

// Esquema de lista de la compra
const shoppingListSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al menu
    ref: "Menu",
    required: false,
  },
  items: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient", // Referencia a un ingrediente en la colección Ingredient
        required: true,
      },
      quantity: {
        type: Number,
        required: true, // Cantidad necesaria para la lista de compras
      },
      unit: {
        type: String,
        required: true,
        enum: ["ud", "g", "mg", "l", "ml"], // Unidades predefinidas
      },
      purchased: {
        type: Boolean,
        default: false, // Indica si el ingrediente ha sido comprado o no
      },
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
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);
module.exports = ShoppingList;
