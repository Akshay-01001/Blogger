import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import {uploadProfilePic} from "../middlewares/multerMiddleware.js";

const userRouter = express.Router();
userRouter.post("/register", uploadProfilePic, registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
