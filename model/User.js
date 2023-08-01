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
  avartar: {
    type: Data,
    dafault: Data.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
