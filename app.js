const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const routes = require("./routes/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./db");

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).json("Server error");
});

app.listen(8000, () => {
  console.log("Server running at http://localhost:8080");
});

module.exports = app;
