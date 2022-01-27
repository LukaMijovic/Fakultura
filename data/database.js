const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    database = client.db("fakultura");
}

function getDb() {
    if (!database) {
        throw {message: "Baza se nije povezala!"};
    }
    return database;
}

module.exports = {
    connectToDb: connect,
    getDb: getDb
};