const morgan = require("morgan");
const debug = require("debug")("app:dev");

const devLogger = async (req, res, next) => {
  try {
    const morganLogger = morgan("tiny");
    morganLogger(req, res, nex);
  } catch (error) {
    next(error);
  }
};

module.exports = devLogger;
