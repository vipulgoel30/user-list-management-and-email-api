// Third party imports
import { Schema, model } from "mongoose";

const listSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [1, "Title must be atleast 1 characters long"],
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true }, strict: false }
);

const usersPopulateOptions = {
  ref: "users",
  localField: "_id",
  foreignField: "list",
};

listSchema.virtual("users", usersPopulateOptions);
listSchema.virtual("usersCount", {
  ...usersPopulateOptions,
  count: true,
});

const List = model("lists", listSchema);

export default List;
