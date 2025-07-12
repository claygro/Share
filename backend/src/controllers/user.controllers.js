import UserModel from "../models/user.models.js";
import PostModel from "../models/post.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  //creating user.
  async createUser(req, res) {
    const { username, name, email, password, posts } = req.body;
    try {
      const existUser = await UserModel.findOne({ email: email });
      if (existUser) {
        return res.status(400).json({ message: "Email is already used." });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            const user = await UserModel.create({
              username: username,
              name: name,
              email: email,
              password: hash,
              posts: posts,
            });
            const token = jwt.sign(
              { email: email, userid: user._id },
              process.env.JWT_SECRET_KEY
            );
            res.cookie("token", token, {
              httpOnly: true,
              secure: true, // Set to true in production with HTTPS
              sameSite: "Lax", // or 'None' if frontend and backend are on different domains
              maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            res.json(user);
          });
        });
      }
    } catch (err) {
      console.log(`error in signup ${err}`);
    }
  }
  //posting.
  async post(req, res) {
    const { email } = req.user;
    const user = await UserModel.findOne({ email: email }).populate("posts");

    const { post } = req.body;
    const userPost = await PostModel.create({ username: user._id, post: post });
    user.posts.push(userPost._id);
    await user.save();
    res.status(200).json(userPost);
  }
  //showing data.
  async showData(req, res) {
    const data = await PostModel.find({}).populate("username");
    res.status(200).json(data);
  }
  //deleting post.
  async postDelete(req, res) {
    const { id } = req.params;

    try {
      const post = await PostModel.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({ message: "Post deleted successfully", post });
    } catch (err) {
      res.status(500).json({ message: "Error deleting post" });
    }
  }
  //login part.
  async login(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    const isPasswordMatch = bcrypt.compare(password, user ? user.password : "");
    if (!user || !isPasswordMatch) {
      res.status(404).json({ message: "Something went wrong." });
    } else {
      let token = jwt.sign(
        { email: email, userid: user._id },
        process.env.JWT_SECRET_KEY
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      });
      res.status(200).json({ message: "login successfully" });
    }
  }
  //profile section.
  async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.userid).populate("posts");
      if (!user) res.status(404).json({ message: "user not found" });
      else res.status(200).json({ message: "Working", user });
    } catch (error) {
      res.status(404).json({ message: "User not found", error: error });
    }
  }
}
export default UserController;
