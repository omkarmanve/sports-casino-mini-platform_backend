function isEmail(value) {
  if (typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateRegister(body) {
  const { name, email, password } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  if (!email || !isEmail(email)) {
    return "Invalid email";
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}

function validateLogin(body) {
  const { email, password } = body;

  if (!email || !isEmail(email)) {
    return "Invalid email";
  }

  if (!password || typeof password !== "string") {
    return "Password is required";
  }

  return null;
}

module.exports = { validateRegister, validateLogin };
