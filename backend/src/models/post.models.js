import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  username: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  date: {
    type: Date,
    default: Date.now(),
  },
  post: String,
});
const PostModel = mongoose.model("post", postSchema);
export default PostModel;
