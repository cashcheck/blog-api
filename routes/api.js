const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/user_controller");
const postController = require("../controllers/post_controller");
const adminStrategy = require("../strategies/jwt_admin");
const userStrategy = require("../strategies/jwt_username");

//configuriing different strategies for passport
passport.use("admin", adminStrategy);
passport.use("username", userStrategy);

//login and register routets

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post(
  "/post",
  passport.authenticate("admin", { session: false }),
  postController.postPost
);

router.get("/post", postController.getPosts);

router.get("/post/:url", postController.getPost);

router.put(
  "/post/:url",
  passport.authenticate("admin", { session: false }),
  postController.updatePost
);

module.exports = router;
