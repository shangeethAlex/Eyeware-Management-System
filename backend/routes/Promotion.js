const express = require("express");
const router = express.Router();

const UserModel = require("../models/Users");

router.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
  // .catch(res.status(500).json({error:"error"}))
});

router.get("/getUserc/:code", (req, res) => {
  const code = req.params.code;
  UserModel.findOne({ code: code })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
  // .catch(res.status(500).json({error:"error"}))
});

router.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      code: req.body.code,
      name: req.body.name,
      value: req.body.value,
      description: req.body.description,
      minOrder: req.body.minOrder,
      maxOrder: req.body.maxOrder,
      status: req.body.status,
      restrictEmail: req.body.restrictEmail,
      noItem: req.body.noItem,
      usageLimit: req.body.usageLimit,
      couponQuantity: req.body.couponQuantity,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

router.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
  // .catch(res.status(500).json({error:"error"}))
});

module.exports = router;
