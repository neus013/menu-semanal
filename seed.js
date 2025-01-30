require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./server/models/user");
const Ingredient = require("./server/models/ingredient");
const Dish = require("./server/models/dish");
const IngredientGroup = require("./server/models/ingredientGroups");
const Menu = require("./server/models/menu");
const ShoppingList = require("./server/models/shoppingList");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

const seedDatabase = async () => {
  const session = await mongoose.startSession(); // Iniciar sesión para la transacción
  session.startTransaction(); // Comenzar la transacción

  try {
    // Crear ingredientes
    const tomato = new Ingredient({
      name: "Tomate",
      type: "verdura",
    });
    const lettuce = new Ingredient({
      name: "Lechuga",
      type: "verdura",
    });
    await tomato.save();
    await lettuce.save();
    console.log("Ingredientes creados:", tomato, lettuce);

    // Crear grupo de ingredientes
    const vegetableGroup = new IngredientGroup({
      name: "Verduras",
      ingredients: [tomato._id, lettuce._id],
    });
    await vegetableGroup.save();
    console.log("Grupo de ingredientes creado:", vegetableGroup);

    // Crear un plato (Dish)
    const dish1 = new Dish({
      name: "Ensalada",
      type: "dinar",
      description: "Ensalada con tomate y lechuga",
      ingredients: [
        { ingredient: tomato._id, quantity: 50, unit: "g" },
        { ingredient: lettuce._id, quantity: 30, unit: "g" },
      ],
    });
    await dish1.save();
    console.log("Plato creado:", dish1);

    // Crear un usuario
    const user = new User({
      username: "juan123",
      name: "Juan Pérez",
      email: "juan@example.com",
      googleId: "google12345",
      passwordHash: "hashedPassword123", // Esto debe ser un hash real en producción
    });
    await user.save();
    console.log("Usuario creado:", user);

    // Crear un menú para el usuario
    const menu = new Menu({
      name: "Menu 1",
      user: user._id,
      week: "2025-03-01", // Semana de ejemplo
      days: [
        {
          day: "Dilluns",
          meals: [
            { type: "esmorzar", plannedDish: dish1._id },
            { type: "dinar", plannedDish: dish1._id },
          ],
        },
        {
          day: "Dimarts",
          meals: [
            { type: "esmorzar", plannedDish: dish1._id },
            { type: "dinar", plannedDish: dish1._id },
          ],
        },
      ],
    });
    await menu.save();
    console.log("Menú creado:", menu);

    // Crear una lista de compras para el usuario
    const shoppingList = new ShoppingList({
      userId: user._id,
      week: "2025-03-01", // Semana de ejemplo
      items: [
        { ingredient: tomato._id, quantity: 5, unit: "ud" },
        { ingredient: lettuce._id, quantity: 2, unit: "ud" },
      ],
    });
    await shoppingList.save();
    console.log("Lista de compras creada:", shoppingList);

    mongoose.connection.close(); // Cerrar la conexión a MongoDB
  } catch (error) {
    // Si algo falla, hacer rollback
    await session.abortTransaction();
    console.error(
      "Error durante la transacción. Todo ha sido revertido",
      error
    );

    // Cerrar la sesión
    session.endSession();
    mongoose.connection.close(); // Cerrar la conexión a MongoDB
  }
};

seedDatabase();
