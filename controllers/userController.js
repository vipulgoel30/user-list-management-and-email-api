// Third party imports
import jwt from "jsonwebtoken";

// User Imports
import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";

export const unsubscribe = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  try {
    const { id, list } = jwt.decode(token);
    console.log(id, list);
    const user = await User.findOneAndUpdate({ _id: id, list: list }, { isSubscribed: false });
    console.log(user);
    res.status(200).send("<h1>Successfully unsubscribed from mailing list</h1>");
  } catch (err) {
    console.log(err);
    res.status(400).send("<h1>Please verify the link</h1>");
  }
});
