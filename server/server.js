require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ingredientRoutes = require("./routes/ingredientRoutes.js");
const dishRoutes = require("./routes/dishRoutes.js");
const menuRoutes = require("./routes/MenuRoutes.js");
const shoppingListRoutes = require("./routes/shoppingListRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const ingredientGroupRoutes = require("./routes/ingredientGroupsRoutes.js");

const app = express();


// URI de conexión
const uri = 'mongodb://localhost:27017/menu_semanal'; 

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB', err);
  });

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Rutas
app.use("/api/ingredients", ingredientRoutes); // Rutas de ingredientes
app.use("/api/dishes", dishRoutes); // Rutas de platos
app.use("/api/menus", menuRoutes); // Rutas de menús
app.use("/api/shopping-list", shoppingListRoutes); // Rutas de lista de compras
app.use("/api/users", userRoutes); // Rutas de usuarios
app.use("/api/ingredient-groups", ingredientGroupRoutes); // Rutas de grupos de ingredientes


// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión a MongoDB establecida"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Escucha el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
