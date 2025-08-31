const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    text:String,
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const comment = mongoose.model("Comment",commentSchema);

module.exports = comment;