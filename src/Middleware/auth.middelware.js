const jwt = require("jsonwebtoken")
const UserModel = require("../model/user.model")
const FoodPartneModel = require("../model/FoodPartner.model")


async function AuthFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: "Please Login!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Secrets)
        const foodPartner = await FoodPartneModel.findById(decoded.id)
        req.foodPartner = foodPartner
        next()
    }
    catch (error) {
        res.status(400).json({
            message: "invalid token"
        })
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token



    try {
        const decoded = jwt.verify(token, process.env.JWT_Secrets)
        const user = await UserModel.findById(decoded.id)

        req.user = user
        console.log("REQ.USER:", req.user);
        next()
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    authUserMiddleware,AuthFoodPartnerMiddleware
}