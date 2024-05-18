// Third party imports
import jwt from "jsonwebtoken";

// User Imports
import User from "../models/User.js";
import catchAsync from "../utils/catchAsync.js";

export const unsubscribe = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  try {
    const { id, list } = jwt.decode(token);

    await User.findOneAndUpdate({ _id: id, list: list }, { isSubscribed: false });

    res.status(200).send("<h2>Successfully unsubscribed from mailing list</h2>");
  } catch (err) {
    res.status(400).send("<h2>Please verify the link</h2>");
  }
});
