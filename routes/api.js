const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");
const adminStrategy = require("../strategies/jwt_admin");
const userStrategy = require("../strategies/jwt_username");

//configuriing different strategies for passport
passport.use("admin", adminStrategy);
passport.use("username", userStrategy);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get(
  "/protected",
  passport.authenticate("admin", { session: false }),
  (req, res, next) => {
    res.status(200).json({ message: "welcome to the protected route" });
  }
);

module.exports = router;
