const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Task = require("../../src/models/task");
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

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Annia",
  email: "Annia@gmail.com",
  password: "321de987",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.TOKEN_PHRASE),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First Task",
  completed: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second Task",
  completed: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third Task",
  completed: true,
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOne,
  userOneId,
  setupDatabase,
  taskOne,
  userTwo,
};
