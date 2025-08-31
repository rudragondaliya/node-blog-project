const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/like");


exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");

    blog.likes += 1;
    await blog.save();

    res.json({ likes: blog.likes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");

    const newComment = new Comment({
      text,
      author: req.user._id, 
      blog: blog._id
    });

    await newComment.save();
    blog.comments.push(newComment._id);
    await blog.save();

    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.getHome = async (req, res) => {
  try {
    const featuredBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name");

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("author", "name");

    const pagination = {
      current: 1,
      pages: [1] 
    };

    res.render("home", {
      title: "Home",
      featuredBlogs,   
      recentBlogs,    
      pagination,     
      user: req.user || null
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.getCreatePage = (req, res) => {
  res.render("blogs/create", { title: "Create Blog", user: req.user || null });
};


exports.createBlog = async (req, res) => {
  try {
    const blogData = {
      title: req.body.title,
      content: req.body.content,
      author: req.session.userId, // from session
      image: req.file ? "/uploads/" + req.file.filename : null,
    };

    await Blog.create(blogData);
    res.redirect("/home");
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).send("Error creating blog");
  }
};


exports.getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name") // populate only username field
      .populate({
        path: "comments",
        populate: { path: "author", select: "" }
      });

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    res.render("blogs/details", { blog, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};


exports.getEditPage = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.session.userId,
    }).lean();

    if (!blog) return res.status(404).send("Blog not found");

    res.render("blogs/edit", { title: "Edit Blog", blog, user: req.user || null });
  } catch (err) {
    console.error("Error loading edit page:", err);
    res.status(500).send("Server Error");
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      content: req.body.content,
    };

    if (req.file) {
      updateData.image = "/uploads/" + req.file.filename;
    }

    await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.session.userId },
      updateData
    );

    res.redirect("/profile");
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).send("Server Error");
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.session.userId,
    });

    res.redirect("/profile");
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).send("Server Error");
  }
};


exports.getProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) return res.redirect("/login");

    const user = await User.findById(userId).lean();
    const blogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.render("profile", { title: "My Profile", user, blogs });
  } catch (err) {
    console.error("Error loading profile:", err);
    res.status(500).send("Server Error");
  }
};
