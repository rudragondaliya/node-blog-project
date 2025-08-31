
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signupPage = (req, res) => res.render("auth/signup");
exports.loginPage = (req, res) => res.render("auth/login");


exports.signup = async (req, res) => {
    try {
        const { name, email, password, bio ,avatar} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.redirect("/signup");

        const hashedPassword = await bcrypt.hash(password, 10);

        const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            bio,
            avatar: avatarPath
        });

        req.session.userId = user._id;
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/signup");
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.redirect("/");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.redirect("/");

        req.session.userId = user._id;
        res.redirect("/home");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.redirect("/");
    });
};
