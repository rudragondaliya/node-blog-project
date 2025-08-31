const express = require("express");
const authRouter = require("./authRouter");
const blogRouter = require("./blogRouter");
const likeRouter = require("./likeRouter");
const commentRouter = require("./commentRouter");
const blogController = require("../controllers/blogController");
const { getProfile } = require("../controllers/profileController"); // ✅ FIXED
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/home", authMiddleware, blogController.getHome);
router.use("/blogs", authMiddleware, blogRouter);
router.use("/likes", authMiddleware, likeRouter);
router.use("/comments", authMiddleware, commentRouter);
router.get("/profile", authMiddleware, getProfile); // ✅ Correct function


router.use("/", authRouter);

module.exports = router;
