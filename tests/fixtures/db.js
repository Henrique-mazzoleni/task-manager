const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Henrique",
  email: "henrique@gmail.com",
  password: "123de456",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.TOKEN_PHRASE),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOne,
  userOneId,
  setupDatabase,
};
