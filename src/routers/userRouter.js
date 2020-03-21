const express = require("express");
const User = require("../models/User");
const userSchemaValidation = require("../middleware/Validation/userSchemaValidation");
const router = express.Router();

router.post("/", userSchemaValidation, async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(404).send({ error: "There are no users." });
    }

    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "This user does not exist." });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/:id", userSchemaValidation, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "bio"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates." });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res
        .status(400)
        .send({ error: "This user does not exist to update." });
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(400).send({ error: "User not found." });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
