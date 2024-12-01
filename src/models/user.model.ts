import mongoose from "mongoose";
interface IUser {
  name: string;
  email: string;
  password: string;
  streakCount: number;
  lastWatch: Date
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    streakCount: {
      type: Number,
      default: 0
    },
    lastWatch: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
