/*const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

// const authRoutes = require("./modules/auth/auth.routes");
const gamesRoutes = require("./modules/games/games.routes");
const favoritesRoutes = require("./modules/favorites/favorites.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/games", gamesRoutes);
app.use("/favorites", favoritesRoutes);

app.use(errorHandler);

module.exports = app;
?>*/
const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes.js");
const errorHandler = require("./middleware/errorHandler");
const gamesRoutes = require("./modules/games/games.routes.js");
const favoritesRoutes = require("./modules/favorites/favorites.routes.js");
const app = express();
app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);

app.use("/games", gamesRoutes);
app.use("/favorites", favoritesRoutes);

module.exports = app;