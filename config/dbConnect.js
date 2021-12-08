const mongoose = require("mongoose");

mongoDB = process.env.MONGO_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("Database Connected");
  } catch (error) {
    console.log("error=", error);
  }
};

module.exports = ConnectDB;
