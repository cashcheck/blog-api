const post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  post.find().exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (!result.length) {
      res.status(404).json({ err: "no posts found" });
    }
    return res.status(200).json({ posts: result });
  });
};

exports.createPost = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("title must be between 2-60 characters long"),
  body("content").trim().notEmpty().withMessage("content cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors });
    }
    const newPost = new post({
      user: "Hieu",
      title: req.body.title,
      content: req.body.content,
      comments: [],
      date: Date(),
    });

    newPost.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: "post created" });
      return;
    });
  },
];
