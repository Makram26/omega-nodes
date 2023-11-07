const mongoose = require("mongoose");

const packagesModal = new mongoose.Schema({
  wallet: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("products", packagesModal);
