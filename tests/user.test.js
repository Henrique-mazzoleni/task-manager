const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, userOneId, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should sign up new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Gabriella",
      email: "Gabimazz@gmail.com",
      password: "Pumzeira",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "Gabriella",
      email: "gabimazz@gmail.com",
    },
    token: user.tokens[0].token,
  });

  expect(response.body.user.email).not.toBe("Pumzeira");
});

test("Should login user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.tokens[1].token).toBe(response.body.token);
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
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

test("Should not delete if unauthorized", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should load avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Annia",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe("Annia");
});

test("Should not update invalid", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Berlin",
    })
    .expect(400);
});
