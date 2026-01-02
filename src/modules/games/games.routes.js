const router = require("express").Router();
const auth = require("../../middleware/auth.js");
const { getGames } = require("./games.controller.js");

router.get("/", auth, getGames);

module.exports = router;
