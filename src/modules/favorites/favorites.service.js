const db = require("../../config/db");

async function addFavorite({ userId, gameId }) {
  await db.query(
    "INSERT INTO favorites (user_id, game_id) VALUES ($1, $2) ON CONFLICT (user_id, game_id) DO NOTHING",
    [userId, gameId]
  );
}

async function removeFavorite({ userId, gameId }) {
  await db.query("DELETE FROM favorites WHERE user_id = $1 AND game_id = $2", [userId, gameId]);
}

async function listFavorites({ userId }) {
  const result = await db.query(
    `SELECT g.*
     FROM games g
     JOIN favorites f ON f.game_id = g.id
     WHERE f.user_id = $1
     ORDER BY f.created_at DESC`,
    [userId]
  );
  return result.rows;
}

module.exports = { addFavorite, removeFavorite, listFavorites };
