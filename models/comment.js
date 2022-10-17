const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  upVotes: { type: Number },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
});

module.exports = mongoose.model("comment", commentSchema);
