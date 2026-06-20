require("dotenv").config();
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

const privateKey = process.env.PRIVATE_KEY;

router.post("/", validateWith(schema), (req, res) => {
  const { email, password } = req.body;
  const user = usersStore.getUserByEmail(email);
  if (!user || user.password !== password)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = jwt.sign(
    { userId: user.id, name: user.name, email },
    privateKey,
  );
  res.send(token);
});

module.exports = router;
