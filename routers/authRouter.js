const express = require('express');
const { signupPage, signup, loginPage, login } = require('../controllers/authController');
const upload = require('../middleware/upload');
const authRouter = express.Router();

authRouter.get("/signup",signupPage)
authRouter.post("/signup",upload.single("avatar"),signup)
authRouter.get("/",loginPage)
authRouter.post("/",login)

module.exports = authRouter;