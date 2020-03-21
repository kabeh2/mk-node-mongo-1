const helmet = require("helmet");
const debug = require("debug")("app:dev");
const devLogger = require("./middleware/loggers/devLogger");
const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/userRouter");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(helmet());

// Dev Logger
if (server.get("env") === "development") {
  debug("Morgan logger activated...");
  server.use(devLogger);
}

// Routers
server.use("/api/users", userRouter);

module.exports = server;
