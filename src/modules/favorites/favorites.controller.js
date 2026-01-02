const { addFavorite, removeFavorite, listFavorites } = require("./favorites.service");

async function postFavorite(req, res, next) {
  try {
    const gameId = Number(req.params.gameId);
    if (!gameId) return res.status(400).json({ message: "Invalid gameId" });

    await addFavorite({ userId: req.user.id, gameId });
    res.status(201).json({ message: "Favorited" });
  } catch (err) {
    next(err);
  }
}

async function deleteFavorite(req, res, next) {
  try {
    const gameId = Number(req.params.gameId);
    if (!gameId) return res.status(400).json({ message: "Invalid gameId" });

    await removeFavorite({ userId: req.user.id, gameId });
    res.json({ message: "Unfavorited" });
  } catch (err) {
    next(err);
  }
}

async function getFavorites(req, res, next) {
  try {
    const items = await listFavorites({ userId: req.user.id });
    res.json({ items });
  } catch (err) {
    next(err);
  }
}

module.exports = { postFavorite, deleteFavorite, getFavorites };
