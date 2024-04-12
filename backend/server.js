const path = require("path");
const colors = require("colors");

const server = require(path.join(__dirname, "./app"));
const connectMongo = require(path.join(__dirname, "./utils/connect-mongo"));

require("dotenv").config({ path: path.join(__dirname, "./.env") });
connectMongo();

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`Server listening on PORT: ${port}`.yellow.bold)
);
