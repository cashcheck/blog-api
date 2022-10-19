const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/protected");

module.exports = router;
