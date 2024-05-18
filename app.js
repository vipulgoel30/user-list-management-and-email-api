// Third party imports
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";

// User imports
import AppError from "./utils/AppError.js";
import globalErrController from "./controllers/globalErrController.js";
import listRouter from "./router/listRouter.js";
import userRouter from "./router/userRouter.js";

const app = express();

app.use(express.json());
app.use(express.text());

// cors - allowing all the origins
app.use(cors("*"));

// express-mongo-sanitize : sanitize the incoming payload for the mongoDB specific symbols
app.use(mongoSanitize());

// // helmet : add security headers
// app.use(helmet());

app.use("/list", listRouter);
app.use("/user", userRouter);

app.use("*", (req, _, next) => {
  next(new AppError(`We don't handle this route ${req.method} : ${req.originalUrl}`, 404));
});

app.use(globalErrController);

export default app;
