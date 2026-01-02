const { validateRegister, validateLogin } = require("./auth.validation.js");
const { findUserByEmail, createUser, loginUser } = require("./auth.service.js");

async function register(req, res, next) {
  try {
    const error = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error });

    const { name, email, password } = req.body;

    const existing = await findUserByEmail(email.toLowerCase());
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const user = await createUser({ name, email, password });
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const error = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error });

    const { email, password } = req.body;

    const result = await loginUser({ email, password });
    if (!result) return res.status(401).json({ message: "Invalid credentials" });

    return res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
