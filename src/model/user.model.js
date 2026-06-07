const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   fullname:{
        type:String,
        required:[true]
    },
    email:{
        type:String,
        required:[true],
        unique:[true]
    },
    password:{
        type:String
    }
},{timestamps:true})

const UserModel = mongoose.model("user",UserSchema)

module.exports = UserModel