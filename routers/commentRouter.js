const express = require("express");
const { addComment, deleteComment, getComments } = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/:blogId", authMiddleware, addComment);
router.delete("/:commentId", authMiddleware, deleteComment);
router.get("/:blogId", getComments);

module.exports = router;
