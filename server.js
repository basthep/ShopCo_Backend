const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes"); 
const faqRoutes = require("./routes/faqRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();


// ============================================
// MIDDLEWARE
// ============================================

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ============================================
// ROUTES
// ============================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "SHOP.CO API is running",
    });

});


// Product routes
app.use("/products", productRoutes);

app.use("/products", reviewRoutes);

app.use("/products", faqRoutes);

app.use( "/auth", authRoutes );

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);

app.use( "/images", express.static("public/images")
);


// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message:
            err.message ||
            "Internal Server Error",
    });

});


// ============================================
// SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ShopCo Server running on port ${PORT}`);
});
