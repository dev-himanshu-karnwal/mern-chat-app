const mongoose = require("mongoose");

const connectMongo = () => {
  mongoose
    .connect(
      process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
    )
    .then((connection) =>
      console.log(
        `DB connected Successfully: ${connection.connection.host}`.brightBlue
      )
    )
    .catch((error) => console.log(`Error connecting to DB: ${error}`.red));
};

module.exports = connectMongo;
