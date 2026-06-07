const express = require("express");
const path = require("path");
const app = express();

const cookie = require("cookie-parser");
const cors = require("cors");

const AuthRouter = require("./routes/auth.route");
const FoodRouter = require("./routes/Food.route");
const FoodPartnerRouter = require("./routes/Food-partner.route");

app.use(express.json());
app.use(cookie());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

// API Routes
app.use("/api/auth", AuthRouter);
app.use("/api/food", FoodRouter);
app.use("/api/food-partner", FoodPartnerRouter);

// React Build
app.use(express.static(path.join(__dirname, "../public")));

app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;