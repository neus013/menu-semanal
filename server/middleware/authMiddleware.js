const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No hay token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = { userId: decoded.userId }; // Aseguramos que userId esté presente
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = authMiddleware;
