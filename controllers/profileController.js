const Blog = require("../models/blog");


exports.getProfile = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.render("profile", { blogs, user: req.user });
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


exports.editBlogPage = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("/profile");
    res.render("blogs/edit", { blog, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


exports.updateBlog = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

