import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
