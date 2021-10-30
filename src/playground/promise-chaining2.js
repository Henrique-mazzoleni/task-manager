require("../db/mongoose");
const Task = require("../models/task");

// Task.findByIdAndDelete("61784190cc41bd644420cce8")
//   .then((deleted) => {
//     console.log(deleted);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const deleteAndCount = async (id, completed) => {
  const deleted = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments(completed);
  return count;
};

deleteAndCount("61799cb38dc191c0148249ff", false)
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
