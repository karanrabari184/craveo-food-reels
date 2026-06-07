const mongoose = require("mongoose")

const FoodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    video:{
        type:String,
        required:[true]
    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food_Partner"
    },
    LikeCount:{
        type:Number,
        default:0
    },
    SaveCount:{
        type:Number,
        default:0
    }
},{timestamps:true})

const FoodModel = mongoose.model("Food",FoodSchema)

module.exports = FoodModel