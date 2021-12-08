const express = require("express");
const User = require("../models/users");
const router = express.Router();

// GET :  RETURN ALL USERS
router.get("/users", (req, res) => {
  User.find({}, (err, data) => {
    err
      ? res.status(400).send({ Code: "error Fetching Users", msg: { err } })
      : res.send({ msg: "Success", Res: data });
  });
});

// POST :  ADD A NEW USER TO THE DATABASE
router.post("/user", async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const data = await newUser.save();
    res.status(200).send({ Msg: "New user Added", data });
  } catch (error) {
    res.status(400).send({ Msg: "error Adding User", msg: { error } });
  }
});

// PUT : EDIT A USER BY ID
router.put("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const findAndUpdate = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.status(200).send({ Msg: `user id :${userId} updated`, findAndUpdate });
  } catch (error) {
    res.status(400).send({ Msg: "error Updating", msg: { error } });
  }
});

// DELETE : REMOVE A USER BY ID
router.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const findAndDelete = await User.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .send({ Msg: `user id :${userId} Deleted`, uset: { ...findAndDelete } });
  } catch (error) {
    res.status(400).send({ Msg: "error deleting", msg: { error } });
  }
});

module.exports = router;
