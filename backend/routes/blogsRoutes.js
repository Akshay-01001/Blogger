import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/blogsController.js";
import { uploadThumbnail } from "../middlewares/multerMiddleware.js";
import express from "express";

const postRouter = express.Router();

postRouter.post("/create-post", uploadThumbnail, createPost);
postRouter.get("/get-blogs", getPosts);
postRouter.delete("/delete", deletePost);

export default postRouter;
