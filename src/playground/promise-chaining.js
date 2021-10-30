require("../db/mongoose");
const User = require("../models/user");

// User.findByIdAndUpdate("61783c485fd8e79118a45ffc", { age: 37 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 0 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updateAndCount = async (id, age) => {
  const updatedUser = await User.findByIdAndUpdate(id, { age });
  const countTimes = await User.countDocuments({ age });
  return countTimes;
};

updateAndCount("61783c485fd8e79118a45ffc", 37)
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
