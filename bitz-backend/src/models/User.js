import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
