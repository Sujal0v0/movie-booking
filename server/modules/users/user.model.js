import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate: {
      //   validator: (v) => {
      //     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid email!`,
      // },
    },
    password: { type: String, required: true, select: false },
    roles: {
      type: Array,
      default: ["user"],
      required: true,
    },

    image: { type: String },
    otp: { type: String },
    isEmailVerified: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
