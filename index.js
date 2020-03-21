const server = require("./src/server");
const debug = require("debug")("app:dev");

const port = process.env.PORT || 3001;

server.listen(port, () => debug(`Server is listening on port ${port}...`));
