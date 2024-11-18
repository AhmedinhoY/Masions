const express = require("express");
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/user-routes");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());

// CORS
let frontendURL = "http://localhost:5173";

app.use(
  cors({
    origin: frontendURL, // The allowed origin for CORS
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Enable credentials (cookies, HTTP authentication)
  })
);

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  throw error;
});

// error function that express js recognizes it
// a generic error handling function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error has occured!" });
});

mongoose
  .connect(
    "mongodb+srv://alishaikhhusain14:1412Imam@cluster0.fvze0.mongodb.net/Place?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
