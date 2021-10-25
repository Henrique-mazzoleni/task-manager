const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://mongodb:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to server");

    const db = client.db(databaseName);

    db.collection("users").insertOne({
      name: "Herique",
      age: 37,
    });
  }
);
