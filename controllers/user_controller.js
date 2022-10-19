const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.register = [
  body("username")
    .trim()
    .isLength({ min: 4, max: 25 })
    .withMessage("username must be between 4-25 characters")
    .custom(async (username) => {
      try {
        const findUser = await user.findOne({ username }).exec();
        if (findUser) {
          return Promise.reject();
        }
        return Promise.resolve();
      } catch (err) {
        return err;
      }
    })
    .withMessage("username already in use"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    let { username, password } = req.body;
    if (!errors.isEmpty()) {
      return res
        .status(403)
        .json({ username, errors: errors.array(), body: req.body });
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
  user.findOne({ username }).exec((err, result) => {
    if (err) {
      return next(err);
    }
    bcrypt.compare(password, result.password, (err, match) => {
      if (match) {
        let opts = {};
        const secret = process.env.secret;
        const token = jwt.sign({ username, id: result._id }, secret, opts);
        return res.status(200).json({ message: "login successful", token });
      } else {
        return res.status(401).json({ message: "Auth failed" });
      }
    });
  });
};
