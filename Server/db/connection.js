const mongoose = require("mongoose");

const conn = mongoose
  .connect(process.env.MONGO_URL)
  .then((db) => {
    console.log("Database connected");
    return db;
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = conn;
