const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    dafault: "https://www.gravatar.com/avatar/?d=mp",
  },
  date: {
    type: Date,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
