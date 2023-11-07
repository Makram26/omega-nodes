var mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    ip: {
      type: String,
      required: [true, "IP is required"],
    },
    location: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    server: {
      type: String,
      required: false,
    },
    wallet: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("nodedetails", userSchema);
