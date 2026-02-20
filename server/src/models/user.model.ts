import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  is_verified: boolean;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
