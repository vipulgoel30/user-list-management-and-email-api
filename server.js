["uncaughtException", "unhandledRejection"].map((errType) =>
  process.on(errType, (err) => {
    console.log(errType.toUpperCase());
    console.log(err);
    process.exitCode = 0;
  })
);

// Third party imports
import { connect } from "mongoose";

// User imports
import app from "./app.js";
import retry from "./utils/retry.js";

const { MONGO_CONN } = process.env;

const PORT = process.env.NODE_ENV === "prod" ? 6000 : 5000;
app.listen(PORT, () => {
  console.log(`App listening on port : ${PORT}`);
});

retry(() => connect(MONGO_CONN), 10000, 10, 100)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.log("Error in MongoDB connection");
    console.log(err);
  });
