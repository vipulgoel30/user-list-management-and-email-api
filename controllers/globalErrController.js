import AppError from "../utils/AppError.js";

export default (err, req, res, next) => {
  console.log(err);
  let message = "Uhh! Something went wrong on the server";
  let statusCode = 500;
  if (err instanceof AppError) {
    message = err.message;
    statusCode = err.statusCode;
  } else {
    if (err.code === 11000) {
      if (err.message.includes("title")) {
        message = "Looks like a list with that name already exists! Try a different title.";
        statusCode = 400;
      }
    }
  }

  res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? "fail" : "error",
    message: message,
  });
};
