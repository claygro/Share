import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(
  cors({
    origin: "https://share-frontend-xg3u.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/user", router);
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.status(200).json({ message: "Logged out" });
});
app.listen(8000, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log("connect with database and server is starting");
  } catch (err) {
    console.log(`\nerror in connecting with database ${err}\n`);
  }
});
