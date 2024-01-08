const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://boo:80XXNUpWu6AqTJlp@cluster0.gmod0ff.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client;

