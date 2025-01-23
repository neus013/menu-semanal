const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  shoppingLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "ShoppingList" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
