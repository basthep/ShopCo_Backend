const express = require("express");

const {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Add product
router.post( "/", authMiddleware, addToCart );
 
// Get user's cart
router.get( "/", authMiddleware, getCart ); 

// Update quantity
router.put( "/:id", authMiddleware, updateCart );
 
// Remove item
router.delete( "/:id", authMiddleware, removeCartItem );
 
// Clear cart
router.delete( "/", authMiddleware, clearCart );


module.exports = router;