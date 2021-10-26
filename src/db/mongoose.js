const mongoose = require("mongoose");

mongoose.connect("mongodb://mongodb:27017/task-manage-api");

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//   },
//   age: {
//     type: Number,
//   },
// });

// new User({
//   name: "Mazzoleni",
//   age: "thirty seven",
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
  },
  completed: {
    type: Boolean,
  },
});

new Task({
  description: "Fix bike",
  completed: false,
})
  .save()
  .then((bike) => {
    console.log(bike);
  })
  .catch((error) => {
    console.log(error);
  });
