const clientPromise = require('./connection');
const { ObjectId } = require('mongodb');
class MongoCRUD {
  constructor(collection) {
    this.dbName = "boo";
    this.collection = collection
    this.client = null;
  }

  async connect() {
    if (!this.client) {
      this.client = await clientPromise;
    }
  }
  async close() {
    if (this.client) {
      console.log('Closing MongoDB connection');
      this.client = null;
    }
  }

  async create(data) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collection);
    try {
      const result = await collection.insertOne(data);
      return result.insertedId;
    } catch (err) {
      console.error('Error creating document:', err);
      throw err;
    }
  }

  async getAll(conditions = {}, sort = {}) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collection);
    try {
      const cursor = await collection.find(conditions).sort({ [sort.sortBy]: sort.sortOrder }).toArray();
      return cursor;
    } catch (err) {
      console.error('Error retrieving documents:', err);
      throw err;
    }
  }

  async getById(id) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collection);
    try {
      const result = await collection.findOne({ _id: new ObjectId(id) });     
      return result;
    } catch (err) {
      console.error('Error retrieving document by ID:', err);
      throw err;
    }
  }

  async updateById(id, updateFields) {
    await this.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection(this.collection);
    try {
      const result = await collection.updateOne({ _id: new ObjectId(id) },
        { $set: updateFields });
      return result;
    } catch (err) {
      console.error('Error updating document by ID:', err);
      throw err;
    }
  }
}

module.exports = MongoCRUD;