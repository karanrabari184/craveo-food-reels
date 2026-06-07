const mongoose  = require("mongoose")

const LikeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:"true"
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        required:true
    }
},{timestamps:true}
)

const Likemodel = mongoose.model("like",LikeSchema)

module.exports = Likemodel