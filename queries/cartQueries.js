const addToCartQuery = `
    INSERT INTO cart (
        user_id,
        product_id,
        quantity,
        size,
        color
    )
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (
        user_id,
        product_id,
        size,
        color
    )
    DO UPDATE SET
        quantity = cart.quantity + EXCLUDED.quantity,
        updated_at = CURRENT_TIMESTAMP
    RETURNING *;
`;


const getCartQuery = `
    SELECT
        cart.id,
        cart.user_id,
        cart.product_id,
        cart.quantity,
        cart.size,
        cart.color,
        cart.created_at,
        cart.updated_at,

        products.name,
        products.price,
        products.offer_price,
        products.offer,
        products.images

    FROM cart

    INNER JOIN products
        ON cart.product_id = products.id

    WHERE cart.user_id = $1

    ORDER BY cart.created_at DESC;
`;


const updateCartQuery = `
    UPDATE cart

    SET
        quantity = $1,
        updated_at = CURRENT_TIMESTAMP

    WHERE id = $2
    AND user_id = $3

    RETURNING *;
`;


const removeCartItemQuery = `
    DELETE FROM cart

    WHERE id = $1
    AND user_id = $2

    RETURNING *;
`;


const clearCartQuery = `
    DELETE FROM cart

    WHERE user_id = $1;
`;


module.exports = {
    addToCartQuery,
    getCartQuery,
    updateCartQuery,
    removeCartItemQuery,
    clearCartQuery,
};