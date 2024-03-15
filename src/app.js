const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRoutes = require("./api/routes/auth");
const transactionRoutes = require("./api/routes/transaction");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);

app.use(function (req, res, next) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
