const express = require("express");
const blogController = require("../controllers/blogController");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/create", blogController.getCreatePage);
router.post("/",upload.single("image"), blogController.createBlog);
router.get("/edit/:id", blogController.getEditPage);
router.post("/edit/:id",upload.single("image"), blogController.updateBlog);
router.get("/:id", blogController.getBlogDetails);
router.post("/delete/:id", blogController.deleteBlog);
router.post("/:id/like", blogController.likeBlog);
router.post("/:id/comment", blogController.addComment);

module.exports = router;
