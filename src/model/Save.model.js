const mongoose = require("mongoose")

const SaveSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        required:true
    }
},{timestamps:true}
)

const SaveModel = mongoose.model("Save",SaveSchema)

module.exports = SaveModel