require("../db/mongoose");
const Task = require("../models/task");

Task.findByIdAndDelete("61784190cc41bd644420cce8")
  .then((deleted) => {
    console.log(deleted);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
