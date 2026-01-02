const { listGames } = require("./games.service");

async function getGames(req, res, next) {
  try {
    const sport = req.query.sport ? String(req.query.sport) : null;
    const provider = req.query.provider ? String(req.query.provider) : null;
    const favorites = req.query.favorites === "true";

    const items = await listGames({
      userId: req.user.id,
      sport,
      provider,
      favorites
    });

    res.json({ items });
  } catch (err) {
    next(err);
  }
}

module.exports = { getGames };
