const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true, maxLength: 50 },
  content: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  timestamp: { type: date },
});

postSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

module.exports = Schema.model("post", postSchema);
