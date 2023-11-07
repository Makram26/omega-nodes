const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../new_models/UserDetailsModel");

// Add User Details
router.post(
  "/create",
  [
    body("name", "Name field cannot be blank").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(body);
    let success = false
    if (!errors) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        wallet: req.body.wallet,
        packaged: req.body.packaged,
        start_d: req.body.start_d,
        end_d: req.body.end_d,
        // time: req.body.time,
        no_of_slots: req.body.no_of_slots,
      });
      success = true;
      res.json({ success, user });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({success, message: 'Internal Server Errorrrrr'})
    }
  }
);

module.exports = router;
