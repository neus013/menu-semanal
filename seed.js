require("dotenv").config();
const mongoose = require("mongoose");

// Requerir los modelos
const Ingredient = require("./server/models/ingredient");
const Dish = require("./server/models/dish");
const IngredientGroup = require("./server/models/ingredientGroups");
const Menu = require("./server/models/menu");
const ShoppingList = require("./server/models/shoppingList");
const User = require("./server/models/user");


// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
    seedDatabase(); // Llamamos a la función para insertar datos
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
  });

// Función para insertar datos
const seedDatabase = async () => {
  try {
    // 1. Insertar Ingredientes
    const tomato = new Ingredient({
      name: "Tomàquet",
      type: "verdura",
    });
    await tomato.save();

    const lettuce = new Ingredient({
      name: "Enciam",
      type: "verdura",
    });
    await lettuce.save();

    // 2. Insertar Grupos de Ingredientes
    const vegetableGroup = new IngredientGroup({
      name: "Verdures",
      ingredients: [tomato._id, lettuce._id],
    });
    await vegetableGroup.save();

    // 3. Insertar un Plato
    const dish1 = new Dish({
      name: "Amanida",
      type: "dinar",
      description: "Amanida d'enciam i tomàquet",
      ingredients: [
        {
          ingredient: tomato._id, // Usamos el ObjectId del ingrediente
          quantity: 50,
          unit: "g",
        },
        {
          ingredient: lettuce._id, // Usamos el ObjectId del ingrediente
          quantity: 30,
          unit: "g",
        },
      ],
    });
    await dish1.save();

    // 5. Insertar un Menú
    const menu1 = new Menu({
      name: "Dieta Amanida",
      week: "2025-01-01",
      days: [
        {
          day: "Dilluns",
          meals: [
            {
              type: "dinar",
              plannedDish: dish1._id, // Referencia al plato
              actualDish: null,
            },
            {
              type: "sopar",
              plannedDish: dish1._id, // Referencia al plato
              actualDish: null,
            },
            // Añadir más comidas según sea necesario
          ],
        },
        // Añadir más días según sea necesario
      ],
    });
    await menu1.save();

    // 6. Insertar una Lista de Compras
    const shoppingList1 = new ShoppingList({
      items: [
        {
          ingredient: tomato._id, // Referencia al ingrediente
          quantity: 2,
          unit: "ud",
        },
        {
          ingredient: lettuce._id, // Referencia al ingrediente
          quantity: 1,
          unit: "ud",
        },
      ],
    });
    await shoppingList1.save();

    // 4. Insertar un Usuario
    const user1 = new User({
      username: "neusg",
      name: "Neus",
      email: "neusg@example.com",
      passwordHash: "password123",
      googleId: "google12345",
      menus: [menu1._id],
      shoppingLists: [shoppingList1._id],
    });
    await user1.save();

    console.log("Datos insertados correctamente");
    mongoose.connection.close(); // Cerramos la conexión cuando terminamos
  } catch (error) {
    console.error("Error al insertar datos", error);
  }
};
