import { Router } from "express";
import UserController from "../controllers/user.controllers.js";
import UserModel from "../models/user.models.js";
import jwt from "jsonwebtoken";
const userController = new UserController();
import "dotenv/config";

const router = Router();
router.post("/signup", userController.createUser);
router.post("/post", isLoggedIn, userController.post);
router.get("/", userController.showData);
router.delete("/delete/:id", isLoggedIn, userController.postDelete);
router.get("/currentUser", (req, res) => {
  const userId = req.cookies.token;
  if (!userId) {
    res.status(401).json({ message: "you are not logged in" });
  } else {
    res.json(userId);
  }
});
router.post("/login", userController.login);
router.get("/profile", isLoggedIn, userController.getProfile);
//middleware.
async function isLoggedIn(req, res, next) {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Login required." });
    }

    const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);

    const user = await UserModel.findOne({ _id: data.userid });

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = data; // Attach decoded token (which includes email/userid)
    next(); // ✅ Allow request to proceed to controller
  } catch (err) {
    console.error("Error in isLoggedIn middleware:", err);
    return res.status(403).json({ message: "Unauthorized" });
  }
}
export default router;
