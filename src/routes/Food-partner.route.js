const express = require("express")
const AuthMiddleware = require("../Middleware/auth.middelware")
const FoodPartnerController = require("../Controller/FoodPartnerController")

const FoodPartnerRouter = express.Router()

FoodPartnerRouter.get("/:id",AuthMiddleware.AuthFoodPartnerMiddleware,FoodPartnerController.getFoodPartnerById)

// console.log("Middleware:", AuthFoodPartnerMiddleware);
console.log("Controller:", FoodPartnerController);
console.log("Handler:", FoodPartnerController.getFoodPartnerById)

module.exports = FoodPartnerRouter