const bcrypt = require("bcryptjs");

const password = "1234"; // Contraseña que quieres cifrar

bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;

    console.log("Contraseña cifrada:", hash);
  });
});
