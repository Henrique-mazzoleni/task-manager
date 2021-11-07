const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

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

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should sign up new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Gabriella",
      email: "Gabimazz@gmail.com",
      password: "Punzeira",
    })
    .expect(201);
});

test("Should login user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login inexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "Frambofritz@gmail.com",
      password: "!!!what!!!",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Shoul not get unauthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not delete if unauthorized", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
