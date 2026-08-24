const express = require("express");

const {
    getAllProducts,
    getProductById,
} = require("../controllers/productController");

const router = express.Router();


// GET /products
router.get("/", getAllProducts);


// GET /products/:id
router.get("/:id", getProductById);


module.exports = router;