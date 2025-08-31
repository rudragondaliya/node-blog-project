// const bodyParser = require("body-parser");
// const express = require("express");
// const dotenv = require("dotenv")
// dotenv.config();
// const db = require("./config/db");
// const router = require("./routers");
// const app = express();
// const port = 8003;


// app.set("view engine","ejs");
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
// app.use("/uploads", express.static(__dirname + "/uploads"));


// app.use("/",router)

// app.listen(port,(err)=>{
//     if(!err){
//         db();
//         console.log("server is started..");
//         console.log("http://localhost:"+port);
//     }
// })


const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./config/db");
const router = require("./routers");

const app = express();
const port = 8003;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static(__dirname + "/uploads"));

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24  * 30,
        httpOnly:true
    }
}));

// Make logged-in user available in EJS
app.use(async (req, res, next) => {
    if (req.session.userId) {
        const User = require("./models/user");
        const user = await User.findById(req.session.userId);
        req.user = user;
        res.locals.user = user;
    } else {
        req.user = null;
        res.locals.user = null;
    }
    next();
});


app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.redirect("/home");
        }
        res.clearCookie("connect.sid"); // clear session cookie
        res.redirect("/");
    });
});

app.get("/", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/home");
    }
    res.render("auth/login");
});


app.use("/", router);

app.listen(port, async () => {
    await db();
    console.log("Server running on http://localhost:" + port);
});
