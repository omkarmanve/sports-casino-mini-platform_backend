const db = require("../../config/db.js");
const { hashPassword, comparePassword } = require("../../utils/password.js");
const { signToken } = require("../../utils/jwt.js");

async function findUserByEmail(email) {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
}

async function createUser({ name, email, password }) {
  const password_hash = await hashPassword(password);

  const result = await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
    [name.trim(), email.toLowerCase(), password_hash]
  );

  return result.rows[0];
}

async function loginUser({ email, password }) {
  const user = await findUserByEmail(email.toLowerCase());
  if (!user) return null;

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) return null;

  const token = signToken({ id: user.id, email: user.email });
  return { token };
}

module.exports = { findUserByEmail, createUser, loginUser };
