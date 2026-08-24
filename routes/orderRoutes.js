const express = require("express");

const {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post( "/", authMiddleware, createOrder ); 
router.get( "/", authMiddleware, getOrders ); 
router.get( "/:id", authMiddleware, getOrder ); 
router.put( "/:id/status", authMiddleware, updateOrderStatus );


module.exports = router;