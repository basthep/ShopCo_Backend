const pool = require("../config/db");

const {
    addToCartQuery,
    getCartQuery,
    updateCartQuery,
    removeCartItemQuery,
    clearCartQuery,
} = require("../queries/cartQueries");


// ============================================
// ADD TO CART
// ============================================

const addToCart = async (
    userId,
    productId,
    quantity,
    size,
    color
) => {

    const result = await pool.query(
        addToCartQuery,
        [
            userId,
            productId,
            quantity,
            size,
            color,
        ]
    );

    return result.rows[0];
};


// ============================================
// GET CART
// ============================================

const getCart = async (userId) => {

    const result = await pool.query(
        getCartQuery,
        [userId]
    );

    return result.rows;
};


// ============================================
// UPDATE CART QUANTITY
// ============================================

const updateCart = async (
    userId,
    cartId,
    quantity
) => {

    const result = await pool.query(
        updateCartQuery,
        [
            quantity,
            cartId,
            userId,
        ]
    );

    return result.rows[0];
};


// ============================================
// REMOVE CART ITEM
// ============================================

const removeCartItem = async (
    userId,
    cartId
) => {

    const result = await pool.query(
        removeCartItemQuery,
        [
            cartId,
            userId,
        ]
    );

    return result.rows[0];
};


// ============================================
// CLEAR CART
// ============================================

const clearCart = async (client,userId) => {

    await client.query(
        clearCartQuery,
        [userId]
    );
};


module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
};