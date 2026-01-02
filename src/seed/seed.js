const env = require("../../src/config/env.js");
const db = require("../config/db.js");
const seedData = require("./seedData");

async function seed() {
  // basic connectivity check
  await db.query("SELECT 1");

  // insert each row
  for (const item of seedData) {
    await db.query(
      `INSERT INTO games (
        type, sport, league, team_a, team_b, start_time, game_name, provider, category
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )`,
      [
        item.type,
        item.sport || null,
        item.league || null,
        item.team_a || null,
        item.team_b || null,
        item.start_time || null,
        item.game_name || null,
        item.provider || null,
        item.category || null
      ]
    );
  }

  console.log("✅ Seed completed");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
