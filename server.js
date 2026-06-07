require("dotenv").config()
const app = require("./src/app")
const DB = require("./src/DB/Database")
DB()
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})