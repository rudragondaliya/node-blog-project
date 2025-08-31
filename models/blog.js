const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:String,
    content:String,
    image:String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes: { type: Number, default: 0 },
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
  ]

},{
    timestamps:true,
})

const blogs = mongoose.model("Blog",blogSchema);

module.exports = blogs;