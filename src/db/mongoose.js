const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mk-node-mongo-1", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});
