const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the process with failure
  }
  mongoose.connection.on('error', err => {
    console.error("Database connection error:", err.message);
  });
};

module.exports = connectDb;