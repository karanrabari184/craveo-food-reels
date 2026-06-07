const mongoose = require("mongoose")

async function ConnectToDb(){
    mongoose.connect(process.env.Mongo_URI)
    .then(()=>{
        console.log("Database is Connected")        
    })
}

module.exports = ConnectToDb