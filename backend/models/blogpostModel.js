import mongoose from "mongoose";

const blogPostSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: true,
  },
  authorPic: {
    type: String,
    required: true,
  },
});

const blogPostModel =
  mongoose.models.blogpost || mongoose.model("blogpost", blogPostSchema);

export default blogPostModel;
