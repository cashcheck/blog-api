const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.register = [
  body("username")
    .trim()
    .isLength({ min: 4, max: 25 })
    .withMesssage("username must be between 4-25 characters")
    .custom((username) => {
      return user.find({ username }).exec((err, user) => {
        if (err) {
          return Promise.reject("server err");
        }
        if (user) {
          return Promise.reject("username already exists");
        }
      });
    }),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters long"),
  (req, res, next) => {
    const errors = validationResult;
    let { username, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(403).json({ username, errors: errors.array() });
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const newUser = new user({
        username,
        password: hashedPassword,
        upvotes: [],
      });
      newUser.save((err) => {
        if (err) {
          return next(err);
        }
        res
          .status(201)
          .json({ message: "user has been sucessfully registered" });
      });
    });
  },
];

exports.login = (req, res, next) => {
  let { username, password } = req.body;
  user.find({ username }).exec((err, result) => {
    if (err) {
      return next(err);
    }
  });
  return res.status(401).json({ message: "Auth failed" });
};
