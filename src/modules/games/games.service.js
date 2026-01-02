const db = require("../../config/db.js");

async function listGames({ userId, sport, provider, favorites }) {
  let query = "SELECT * FROM games";
  const values = [];
  const where = [];

  if (sport) {
    values.push(sport);
    where.push(`sport = $${values.length}`);
  }

  if (provider) {
    values.push(provider);
    where.push(`provider = $${values.length}`);
  }

  if (favorites === true) {
    values.push(userId);
    where.push(`id IN (SELECT game_id FROM favorites WHERE user_id = $${values.length})`);
  }

  if (where.length) query += " WHERE " + where.join(" AND ");

  query += " ORDER BY id DESC";

  const result = await db.query(query, values);
  return result.rows;
}

module.exports = { listGames };
