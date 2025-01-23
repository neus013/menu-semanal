const mongoose = require("mongoose");
const User = require("./user");

const mealSchema = new mongoose.Schema({
  type: {
    type: String, 
    required: true,
    enum: [
        "esmorzar", 
        "mig matí", 
        "dinar", 
        "berenar", 
        "sopar"
    ], // Tipos de comida predefinidos
  },
  plannedDish: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a un plato predefinido
    ref: "Dish",
    default: null, // Puede ser nulo si no hay plato planeado
  },
  actualDish: {
    type: String, // String en caso de que no sea un plato predefinido (por ejemplo, algo personalizado)
    default: null, // Puede ser nulo si no se ha registrado el plato real
  },
});

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: [
      "Dilluns",
      "Dimarts",
      "Dimecres",
      "Dijous",
      "Divendres",
      "Dissabte",
      "Diumenge",
    ], // Días de la semana fijos
  },
  meals: [mealSchema], // Array de comidas del día, cada comida tiene tipo, plato planeado y plato real
});

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nombre del menú (por ejemplo: "Dieta Mediterránea")
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
  week: {
    type: Date, // Fecha inicial de la semana (por ejemplo "2025-03-01")
    default: null, // Los menús predefinidos no necesitan una fecha asociada
  },
  days: [daySchema], // Lista de días con sus platos planificados y platos reales
  isDefault: {
    type: Boolean,
    default: false, // Indica si es un menú predefinido o uno personalizado
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Fecha de última actualización
  },
}, { timestamps: true }); // Timestamps para createdAt y updatedAt

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
