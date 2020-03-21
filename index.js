const config = require("config");
const server = require("./src/server");
const debug = require("debug")("app:dev");

const port = config.get("port");

server.listen(port, () => debug(`Server is listening on port ${port}...`));
