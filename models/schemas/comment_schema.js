const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  post: { type: Schema.Types.ObjectId, ref: "post" },
  content: { type: String, required: true },
  upVotes: { type: Number },
  date: { type: Date },
  replies: [this],
});

module.exports = commentSchema;
