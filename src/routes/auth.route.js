const express = require("express")
const authUserMiddleware = require("../Middleware/auth.middelware")
const AUthController = require("../Controller/AuthController")

const AuthRouter = express.Router()

AuthRouter.post("/register",AUthController.registerController)
AuthRouter.post("/login",AUthController.LoginController)
AuthRouter.post("/logout",AUthController.LogoutController)

AuthRouter.post("/food-partner/register",AUthController.FoodPartner_Register)
AuthRouter.post("/food-partner/login",AUthController.FoodPartner_login)
AuthRouter.post("/food-partner/logout",AUthController.FoodPartner_logout)



module.exports = AuthRouter