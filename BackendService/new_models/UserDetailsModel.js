const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  wallet: {
    type: String,
    required: true,
  },
  packaged: {
    type: String,
    required: true,
  },
  start_d: {
    type: String,
    required: true,
  },
  end_d: {
    type: String,
    required: true,
  },
  // time: {
  //   type: String,
  //   required: true,
  // },
  no_of_slots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
