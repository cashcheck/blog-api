const post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.getPost = (req, res, next) => {
  post.findOne({ url: req.params.url }).exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      return res.status(400).json({ err: "no matching post url found" });
    }
    return res.status(200).json({ post: result });
  });
};

exports.getPosts = (req, res, next) => {
  post.find().exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (!result.length) {
      return res.status(404).json({ err: "no posts found" });
    }
    return res.status(200).json({ posts: result });
  });
};

exports.postPost = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("title must be between 2-60 characters long"),
  body("content").trim().notEmpty().withMessage("content cannot be empty"),
  body("url")
    .trim()
    .notEmpty()
    .withMessage("url cannot be empty")
    .custom(async (url) => {
      try {
        const foundUrl = post.findOne({ url });
        if (foundUrl) {
          return Promise.reject();
        }
        return Promise.resolve();
      } catch (err) {
        return err;
      }
    })
    .withMessage("url already in use"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors });
    }

    const newPost = new post({
      user: "Hieu",
      title: req.body.title,
      url: req.body.url,
      content: req.body.content,
      comments: [],
      date: Date(),
      publish: req.body.publish,
    });

    newPost.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: "post created" });
    });
  },
];

exports.updatePost = [
  body("url").trim().notEmpty().withMessage("url cannot be empty"),
  body("title")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("title must be between 2-60 characters long"),
  body("content").trim().notEmpty().withMessage("content cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    post.findOne({ url: req.params.url }).exec((err, result) => {
      if (err) {
        return next(err);
      }
      const { title, url, content, publish } = req.body;
      result.title = title;
      result.url = url;
      result.content = content;
      result.publish = publish;
      result.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ msg: "post successfully updated" });
      });
    });
  },
];

exports.postComment = (req, res, next) => {
  post.findOne({ url: req.params.url }).exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      return res.status(400).json({ err: "no matching post url found" });
    }
  });
};
