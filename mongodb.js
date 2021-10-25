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

    db.collection("users").insertOne(
      {
        name: "Herique",
        age: 37,
      },
      (error, result) => {
        if (error) return console.log("Unable to insert user");
        console.log(result);
      }
    );

    db.collection("users").insertMany(
      [
        {
          name: "Annia",
          age: 37,
        },
        {
          name: "Gabriella",
          age: 0,
        },
      ],
      (error, result) => {
        if (error) return console.log("Unable to insert documents");
        console.log(result);
      }
    );

    db.collection("tasks").insertMany(
      [
        {
          description: "comprar capa bike",
          completed: false,
        },
        {
          description: "buscar passaporte Gabriella",
          completed: false,
        },
        {
          description: "cobrar passaporte Italiano",
          completed: true,
        },
      ],
      (error, result) => {
        if (error) return console.log("Unable to insert documents");
        console.log(result);
      }
    );
  }
);
