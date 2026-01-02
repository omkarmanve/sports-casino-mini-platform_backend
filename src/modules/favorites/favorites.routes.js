const router = require("express").Router();
const auth = require("../../middleware/auth.js");
const { postFavorite, deleteFavorite, getFavorites } = require("./favorites.controller.js");

router.get("/", auth, getFavorites);
router.post("/:gameId", auth, postFavorite);
router.delete("/:gameId", auth, deleteFavorite);

module.exports = router;
