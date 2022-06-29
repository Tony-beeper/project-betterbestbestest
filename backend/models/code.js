const sharedbMongo = require("sharedb-mongo");
require("dotenv").config();
const ShareDB = require("sharedb");
const richText = require("rich-text");

const createDoc = (username, id, callback) => {
  const db = sharedbMongo(process.env.MONGO_CONN_STR);
  ShareDB.types.register(richText.type);
  var backend = new ShareDB({ db });
  const connection = backend.connect();
  const doc = connection.get(username, id);
  doc.fetch((err) => {
    if (err) return callback(err);
    if (doc.type === null) {
      // insert dummy element to initilize shardb
      doc.create([{ insert: "Hi!" }], "rich-text", callback());
      return;
    }
    callback("doc already exists");
  });
};

module.exports = createDoc;
