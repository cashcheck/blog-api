const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comment = require("./schemas/comment_schema");

const postSchema = new Schema({
  user: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true, maxLength: 50 },
  content: { type: String, required: true },
  comments: [comment],
  date: { type: Date },
  lastEdit: { type: Date },
  publish: { type: Boolean },
});

module.exports = mongoose.model("post", postSchema);
