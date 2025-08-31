const mongoose = require("mongoose")
const blogs = require("./blog")

const likeSchema = new mongoose.Schema({
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
})

const like = mongoose.model("Like",likeSchema)

module.exports = like