const sharedbMongo = require("sharedb-mongo");
require("dotenv").config();
const ShareDB = require("sharedb");
const richText = require("rich-text");
const mongoose = require("mongoose");

const db = sharedbMongo(process.env.MONGO_CONN_STR);
ShareDB.types.register(richText.type);
var backend = new ShareDB({ db });
const connection = backend.connect();

const createDoc = (username, id, callback) => {
  const doc = connection.get(username, id);
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      // insert dummy element to initilize shardb
      doc.create(
        [{ insert: `welcome to ${username}'s room` }],
        "rich-text",
        callback
      );
      return;
    }
    callback("doc already exist");
  });
};

const deleteDoc = async (docName, id) => {
  console.log(docName, id);
  const conn = await mongoose
    .createConnection(process.env.MONGO_CONN_STR)
    .asPromise();
  await conn.dropCollection(docName);
  await conn.dropCollection(`o_${docName}`);
  return;
  // doc.fetch((err) => {
  //   if (err) throw err;
  //   if (doc.type !== null) {
  //     // insert dummy element to initilize shardb
  //     doc.del({}, async (err) => {
  //       if (err) return callback(err);
  //       // const conn = await mongoose
  //       //   .createConnection(process.env.MONGO_CONN_STR)
  //       //   .asPromise();
  //       // await conn.dropCollection(docName);
  //       // await conn.dropCollection(`o_${docName}`);
  //       return callback();
  //     });
  //   }
  //   callback("doc does not exist");
  // });
};

const test = (username, id, callback) => {
  const doc = connection.get(username, id);
  doc.fetch((err) => {
    if (err) throw err;
    console.log(doc.type);
    if (doc.type === null) {
    }
    callback("doc already exist");
  });
};

module.exports = { createDoc, deleteDoc, test };
