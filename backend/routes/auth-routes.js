const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const { register, login, logout } = require("../controllers/auth-controler");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);

module.exports = router;
