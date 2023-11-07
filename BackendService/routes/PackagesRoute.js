const express = require("express");
const router = express.Router();
const User = require("../new_models/UserDetailsModel");

router.post("/allPackagesByWallet", async (req, res) => {
  let success = false;
  try {
    const { wallet } = req.body
    const walletKey = await User.find({wallet})
 
    res.status(201).send({success: true, walletKey})
  } catch (err) {
    return res.status(500).send({ success, message: "Internal Server Error" });
  }
});




module.exports = router;
