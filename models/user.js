const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, maxLength: 50 },
  password: { type: String, quired: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "post" }],
});

module.exports = mongoose.model("user", userSchema);
