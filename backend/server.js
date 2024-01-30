const path = require("path");
const colors = require("colors");
// const cors=require('cors')

const app = require(path.join(__dirname, "./app"));
const connectMongo = require(path.join(__dirname, "./utils/connect-mongo"));

require("dotenv").config({ path: path.join(__dirname, "./.env") });
connectMongo();

// app.use(cors({
//   origin :'http://localhost:5173',
//   allowedHeaders:['Content-type']
// }))
// app.options('*',cors())

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server listening on PORT: ${port}`.yellow.bold)
);