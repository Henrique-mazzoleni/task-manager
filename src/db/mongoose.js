const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://mongodb:27017/task-manage-api");

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
