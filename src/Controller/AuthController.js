
const UserModel = require("../model/user.model")
const FoodPartneModel = require("../model/FoodPartner.model")
const bcrpt = require("bcrypt")
const jwt = require("jsonwebtoken")

//User Auth Conroller :
async function registerController(req,res) {
    const{fullname,password,email} = req.body

    const isUserexist = await UserModel.findOne({
        email
    })

    if(isUserexist){
        return res.status(400).json({
            message : "user already exist with this email"
        })
    }


    const hash = await bcrpt.hash(password,10)
    const user = await UserModel.create({
        fullname,email,password:hash
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_Secrets)

    res.cookie("token",token,{
  httpOnly: true,
  secure: true,
  sameSite: "none"
})

    res.status(201).json({
        message : "user registerd Sucessfully",
        id: user._id,
        fullname:user.fullname,
        email:user.email
    })
}

async function LoginController(req,res) {
    const{email,password} = req.body

    const isUserexist = await UserModel.findOne({
        email
    })

    if(!isUserexist){
        return res.status(400).json({
            message : "user not exist with this email"
        })
    }

    const passwordValidater = await bcrpt.compare(password,isUserexist.password)

    if(!passwordValidater){
        return res.status(404).json({
            messgae : "Wrong password"
        })
    }

    const token = jwt.sign({
        id:isUserexist._id
    },process.env.JWT_Secrets)

    res.cookie("token",token,{
  httpOnly: true,
  secure: true,
  sameSite: "none"
})

    res.status(200).json({
        message:"User Logged in SuccessFully",
        id:isUserexist._id,
        username:isUserexist.fullname,
        email:isUserexist.email
    })
}

async function LogoutController(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully"
    });
}

//Food Partner Auth Conroller :

async function FoodPartner_Register(req,res) {
    const {name, email, password, phone, address, contactName} = req.body

    if (
  !name ||
  !email ||
  !password ||
  !contactName ||
  !phone ||
  !address
) {
  return res.status(400).json({
    message: "All fields are required"
  });
}

    const is_FoodPartner_exist = await FoodPartneModel.findOne({
        email
    })

    if(is_FoodPartner_exist){
        return res.status(409).json({
            message : "Food Partner Is ALready Exist with this email."
        })
    }
    const hash = await bcrpt.hash(password,10)
    const foodPartner = await FoodPartneModel.create({
        name,email,password:hash,phone, address, contactName
    })

    const token = jwt.sign({
        id:foodPartner._id
    },process.env.JWT_Secrets)

    res.cookie("token",token,{
  httpOnly: true,
  secure: true,
  sameSite: "none"
})

    res.status(201).json({
        message:"FoodPartner Register SuccessFully",
        id:foodPartner._id,
        username:foodPartner.name,
        email:foodPartner.email,
        address: foodPartner.address,
        contactName: foodPartner.contactName,
        phone: foodPartner.phone
    })
}

async function FoodPartner_login(req,res) {
    const {email,password} = req.body

    const is_FoodPartner_exist = await FoodPartneModel.findOne({
        email
    })

    if(!is_FoodPartner_exist){
        return res.status(400).json({
            messgae : "Food Partner not exist with email"
        })
    }


    const passwordValidater = await bcrpt.compare(password,is_FoodPartner_exist.password)

    if(!passwordValidater){
        return res.status(404).json({
            messgae : "Wrong password"
        })
    }

    const token = jwt.sign({
        id:is_FoodPartner_exist._id
    },process.env.JWT_Secrets)

    res.cookie("token",token,{
  httpOnly: true,
  secure: true,
  sameSite: "none"
})

    res.status(200).json({
        message:"User Logged in SuccessFully",
        id:is_FoodPartner_exist._id,
        username:is_FoodPartner_exist.name,
        email:is_FoodPartner_exist.email
    })
    
}

async function FoodPartner_logout(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully"
    })    
}


module.exports ={registerController,LoginController,LogoutController,FoodPartner_Register,FoodPartner_login,FoodPartner_logout}