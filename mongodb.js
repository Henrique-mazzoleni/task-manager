const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://mongodb:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to server");

    const db = client.db(databaseName);

    db.collection("tasks").findOne(
      { _id: new ObjectId("617805521cedd02cadb74c8d") },
      (error, task) => {
        if (error) return console.log("Unable to fetch data");
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, data) => {
        if (error) return console.log("Unable to fetch data");
        console.log(data);
      });
  }
);
