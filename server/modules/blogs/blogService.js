const Blog = require("../blogs/blogModel");

exports.postBlog = async (blogData) => {
  try {
    const newBlog = new Blog(blogData);
    return await newBlog.save();
  } catch (error) {
    console.error("Error in posting blog:", error);
    throw new Error("posting blog failed");
  }
};
exports.getAllBlogs = async () => {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    throw new Error("Unable to view Blogs");
  }
};
exports.getBlogById = async (blogId) => {
  return await Blog.findById(blogId, "title content author");
};

exports.updateBlog = async (blogId, blogData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: { ...blogData } },
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      throw new Error("Blog not found");
    }

    return updatedBlog;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.deleteBlog = async (blogId) => {
  return await Blog.findByIdAndDelete(blogId);
};
