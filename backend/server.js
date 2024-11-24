const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const dbConnection = require("./config/db.js");
// const adminRoute = require("./routes/adminRouter");
const authRoutes =  require("./routes/authRoutes")
const eventRoutes = require('./routes/eventRoutes');

// const orderRoute = require("./routes/orderRouter");
// const menuRoute = require("./routes/menuRouter");
// const contactRoutes = require('./routes/contactRouter');
// const Order = require("./models/orderModel");
const PORT = process.env.PORT || 8000;
require("dotenv").config();
const app = express();
// Allowed origins for CORS
const allowedOrigins = [
  "https://burgerbistro.vercel.app",
  "http://192.168.179.136:5173",
  "http://localhost:5173",
];

// Trust the first proxy for CORS
app.set("trust proxy", 1);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Database connection and server start
dbConnection().then(() => {
  // Routes and other setup can go here
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to database:', error);
});