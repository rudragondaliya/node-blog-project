const Like = require("../models/like");
const Blog = require("../models/blog");

exports.addLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;

    
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

   
    const existingLike = await Like.findOne({ blog: blogId, user: userId });
    if (existingLike) {
      return res.status(400).json({ message: "Already liked this blog" });
    }

    const newLike = new Like({ blog: blogId, user: userId });
    await newLike.save();

    res.status(201).json({ message: "Blog liked", like: newLike });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.removeLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;

    const deleted = await Like.findOneAndDelete({ blog: blogId, user: userId });
    if (!deleted) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.json({ message: "Like removed" });
  } catch (error) {
    console.error("Error removing like:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getLikes = async (req, res) => {
  try {
    const { blogId } = req.params;
    const likes = await Like.find({ blog: blogId }).populate("user", "username");
    res.json({ count: likes.length, likes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ message: "Server error" });
  }
};
