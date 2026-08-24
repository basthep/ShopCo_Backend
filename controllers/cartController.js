const cartRepository = require("../repositories/cartRepository");


// ============================================
// ADD TO CART
// POST /cart
// ============================================

const addToCart = async (req, res, next) => {

    try {

        const userId = req.user.id; 
        const {
            productId,
            quantity,
            size,
            color,
        } = req.body;


        if (!productId) { 
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });

        }


        const cartItem = await cartRepository.addToCart(
                userId,
                productId,
                quantity || 1,
                size || null,
                color || null
            );


        res.status(201).json({ 
            success: true, 
            message: "Product added to cart", 
            cartItem, 
        }); 
    } catch (error) { 
        next(error); 
    }
};


// ============================================
// GET CART
// GET /cart
// ============================================

const getCart = async (req, res, next) => {

    try { 
        const userId = req.user.id; 
        const cart = await cartRepository.getCart( userId );
 
        res.status(200).json({ 
            success: true, 
            cart, 
        }); 
    } catch (error) { 
        next(error); 
    }
};


// ============================================
// UPDATE CART
// PUT /cart/:id
// ============================================

const updateCart = async (req, res, next) => {

    try {

        const userId = req.user.id; 
        const cartId = req.params.id; 
        const { quantity, } = req.body;


        if (!quantity || quantity < 1) { 
            return res.status(400).json({ 
                success: false, 
                message: "Quantity must be at least 1", 
            }); 
        }


        const cartItem = await cartRepository.updateCart( userId, cartId, quantity ); 

        if (!cartItem) { 
            return res.status(404).json({ 
                success: false, 
                message: "Cart item not found", 
            }); 
        }
 
        res.status(200).json({ 
            success: true, 
            message: "Cart quantity updated", 
            cartItem, 
        }); 
    } catch (error) { 
        next(error); 
    }
};


// ============================================
// REMOVE CART ITEM
// DELETE /cart/:id
// ============================================

const removeCartItem =
    async (req, res, next) => {

        try { 
            const userId = req.user.id; 
            const cartId = req.params.id; 
            const cartItem = await cartRepository .removeCartItem( userId, cartId ); 
            if (!cartItem) { 
                return res.status(404).json({ 
                    success: false, 
                    message: "Cart item not found", 
                }); 
            }


            res.status(200).json({ 
                success: true, 
                message: "Cart item removed", 
                cartItem, 
            });

        } catch (error) { 
            next(error); 
        }
    };


// ============================================
// CLEAR CART
// DELETE /cart
// ============================================

const clearCart =
    async (userId) => {

        const result =
            await client.query(
                clearCartQuery,
                [userId]
            );

        return result.rows;
    };


module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
};