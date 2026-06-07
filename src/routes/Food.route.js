const express = require("express")
const AuthMiddleware = require("../Middleware/auth.middelware")
const FoodController = require("../Controller/FoodController")
const FoodRouter = express.Router()
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage(), limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }})

FoodRouter.post("/",upload.single("video"),AuthMiddleware.AuthFoodPartnerMiddleware,FoodController.CreateFood)
FoodRouter.get("/",AuthMiddleware.authUserMiddleware,FoodController.GetFood)
//Like API
FoodRouter.post("/like",AuthMiddleware.authUserMiddleware,FoodController.LikeFood)

//Save API
FoodRouter.post("/save",AuthMiddleware.authUserMiddleware,FoodController.SaveFood)

//Save Page Api
FoodRouter.get("/save",AuthMiddleware.authUserMiddleware,FoodController.GetSaveFood)



module.exports = FoodRouter