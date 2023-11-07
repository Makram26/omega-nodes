const express = require("express");
const router = express.Router();
const AllPackages = require("../models/userModel");

router.post("/allLinksByWallet", async (req, res) => {
  let success = false;
  try {
    const { wallet } = req.body
    const allPackages = await AllPackages.find({wallet})
    res.status(201).send({success: true, allPackages})
  } catch (err) {
    return res.status(500).send({ success, message: "Internal Server Error" });
  }
});


router.post("/allLinksByAdmin", async (req, res) => {
    let success = false;
    try {
      const { wallet } = req.body
      const allPackages = await AllPackages.find()
      res.status(201).send({success: true, allPackages})
    } catch (err) {
      return res.status(500).send({ success, message: "Internal Server Error" });
    }
  });

module.exports = router;