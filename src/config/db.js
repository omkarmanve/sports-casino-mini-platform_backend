const { Pool } = require("pg");
const env = require("./env");

const isRender = env.DATABASE_URL.includes("render.com");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: isRender ? { rejectUnauthorized: false } : false
});

module.exports = pool;
