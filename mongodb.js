const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://mongodb:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to server");

    const db = client.db(databaseName);
  }
);
