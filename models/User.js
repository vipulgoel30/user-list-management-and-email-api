import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isSubscribed: { type: Boolean },
    list: {
      type: Schema.ObjectId,
      ref: "lists",
    },
  },
  { strict: false }
);

const User = model("users", userSchema);

export default User;
