const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://mongodb:27017/task-manage-api");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error("Password cannot contain 'passowrd'");
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age must be a positive number");
    },
  },
});

// new User({
//   name: "  Annia   ",
//   email: "NIVUOLO@GMAIL.COM   ",
//   password: "PaSsWoRd123    ",
// })
//   .save()
//   .then((me) => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// new Task({
//   description: "    scratch your ass    ",
// })
//   .save()
//   .then((bike) => {
//     console.log(bike);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
