const ImageKit = require("@imagekit/nodejs")
const {toFile } = require("@imagekit/nodejs");
const FoodModel = require("../model/Food.model")
const Likemodel = require("../model/Like.model")
const Savemodel = require("../model/Save.model");
const SaveModel = require("../model/Save.model");

const imagekit = new ImageKit({
    privateKey : process.env.imagekit_secret_key
})

async function CreateFood(req, res) {
    try {
        // console.log("BODY:", req.body);
        // console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({
                message: "No file received"
            });
        }

        const file = await imagekit.files.upload({
            file: await toFile(
                Buffer.from(req.file.buffer),
                req.file.originalname
            ),
            fileName: req.file.originalname,
            folder: "food-Reels"
        });

        const Fooditem = await FoodModel.create({
            name: req.body.name,
            video: file.url,
            description: req.body.description,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "reel uploaded",
            Fooditem
        });

    } catch (err) {
        console.error("UPLOAD ERROR:", err);

        return res.status(500).json({
            message: err.message
        });
    }
}

async function GetFood(req, res) {
  const userId = req.user._id;  // now correctly populated

  const foodItems = await FoodModel.find({}).populate("foodPartner", "name").sort({ createdAt: -1 });

  const [userLikes, userSaves] = await Promise.all([
    Likemodel.find({ user: userId }).distinct("food"),
    Savemodel.find({ user: userId }).distinct("food"),
  ]);

  const likedSet = new Set(userLikes.map(String));
  const savedSet = new Set(userSaves.map(String));

  const enriched = foodItems.map((food) => {
    const plain = food.toObject();
    plain.isLiked = likedSet.has(String(plain._id));
    plain.isSaved = savedSet.has(String(plain._id));
    return plain;
  });

  res.status(200).json({
    message: "Food items fetched successfully",
    fooditem: enriched,
  });
}

async function LikeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const existing = await Likemodel.findOne({ user: user._id, food: foodId });

  if (existing) {
    await Likemodel.deleteOne({ user: user._id, food: foodId });
    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodId,
      { $inc: { LikeCount: -1 } },
      { new: true }
    );
    return res.status(200).json({
      message: "Food Unliked",
      LikeCount: updatedFood.LikeCount,
      isLiked: false,           // ← explicit flag
    });
  }

  await Likemodel.create({ user: user._id, food: foodId });
  const updatedFood = await FoodModel.findByIdAndUpdate(
    foodId,
    { $inc: { LikeCount: 1 } },
    { new: true }
  );

  res.status(200).json({
    message: "Food Liked",
    LikeCount: updatedFood.LikeCount,
    isLiked: true,              // ← explicit flag
  });
}

async function SaveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const existing = await Savemodel.findOne({ user: user._id, food: foodId });

  if (existing) {
    await Savemodel.deleteOne({ user: user._id, food: foodId });
    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodId,
      { $inc: { SaveCount: -1 } },
      { new: true }
    );
    return res.status(200).json({
      message: "Food Reel UnSaved successfully",
      SaveCount: updatedFood.SaveCount,   // ← was missing
      isSaved: false,                     // ← was missing
    });
  }

  await Savemodel.create({ user: user._id, food: foodId });
  const updatedFood = await FoodModel.findByIdAndUpdate(
    foodId,
    { $inc: { SaveCount: 1 } },
    { new: true }
  );

  res.status(200).json({
    message: "Food Reel Saved successfully",
    SaveCount: updatedFood.SaveCount,     // ← was missing
    isSaved: true,                        // ← was missing
  });
}

async function GetSaveFood(req,res) {
    const  user = req.user
    const SaveFoods = await SaveModel.find({user:user._id}).populate("food")

    if (!SaveFoods || SaveFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        SaveFoods
    });

}




module.exports = {CreateFood,GetFood,LikeFood,SaveFood,GetSaveFood}