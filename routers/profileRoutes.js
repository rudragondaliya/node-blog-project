const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, editBlogPage, updateBlog, deleteBlog } = require("../controllers/profileController");

router.get("/", authMiddleware, getProfile);
router.get("/edit/:id", authMiddleware, editBlogPage);
router.post("/edit/:id", authMiddleware, updateBlog);
router.post("/delete/:id", authMiddleware, deleteBlog);

module.exports = router;
