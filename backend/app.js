const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/user-routes");
const wishlistRoutes = require("./routes/wishlist-routes");
const messageRoutes = require("./routes/message-routes");
const HttpError = require("./models/http-error");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Serve uploaded images statically
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "uploads", "images"))
);

// CORS configuration
const frontendURL = "http://localhost:5173";
app.use(
  cors({
    origin: frontendURL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// API Routes
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/messages", messageRoutes);

// Middleware to catch-all for unsupported routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error); // Pass error to error-handling middleware
});

// Error-handling middleware
app.use((error, req, res, next) => {
  // Cleanup uploaded file in case of error
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("File cleanup failed:", err);
    });
  }

  // Check if response headers are already sent
  if (res.headerSent) {
    return next(error);
  }

  // Determine HTTP status code
  const statusCode =
    Number.isInteger(error.code) && error.code >= 100 && error.code < 600
      ? error.code
      : 500;

  // Send JSON error response
  res.status(statusCode).json({
    message: error.message || "An unknown error occurred!",
  });
});

// Database connection and server start
const DB_CONNECTION =
  "mongodb+srv://alishaikhhusain14:1412Imam@cluster0.fvze0.mongodb.net/Ahmed?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_CONNECTION)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000.");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
