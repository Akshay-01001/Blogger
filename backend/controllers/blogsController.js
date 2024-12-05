import blogPostModel from "../models/blogpostModel.js";

const createPost = async (req, res) => {
  try {
    const {
      author,
      authorEmail,
      title,
      category,
      content,
      description,
      authorPic,
    } = req.body;
    const thumbnail = req.file?.path;
   
    if (
      !author ||
      !authorEmail ||
      !title ||
      !description ||
      !thumbnail ||
      !authorPic ||
      !category ||
      !content
    ) {
      return res.status(404).json({
        success: false,
        message: "Missing Details",
      });
    }

    const data = {
      author,
      authorEmail,
      title,
      category,
      content,
      thumbnail,
      description,
      authorPic,
    };

    const post = await blogPostModel.create(data);

    if (post) {
      return res.status(200).json({
        success: true,
        message: "Post Created Successfully",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const blogs = await blogPostModel.find();

    if (blogs.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const blog = await blogPostModel.findById(id);

    if (blog) {
      await blogPostModel.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};


export { createPost, getPosts ,deletePost};
