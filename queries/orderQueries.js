const createOrderQuery = `
    INSERT INTO orders (
        user_id,
        total_amount,
        status
    )
    VALUES ($1, $2, $3)
    RETURNING *;
`;


const createOrderItemQuery = `
    INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        size,
        color,
        price
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;


const getUserOrdersQuery = `
    SELECT
        id,
        user_id,
        total_amount,
        status,
        created_at,
        updated_at
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC;
`;


const getOrderByIdQuery = `
    SELECT
        id,
        user_id,
        total_amount,
        status,
        created_at,
        updated_at
    FROM orders
    WHERE id = $1
    AND user_id = $2;
`;


const getOrderItemsQuery = `
    SELECT
        order_items.id,
        order_items.order_id,
        order_items.product_id,
        order_items.quantity,
        order_items.size,
        order_items.color,
        order_items.price,

        products.name,
        products.images

    FROM order_items

    INNER JOIN products
        ON order_items.product_id = products.id

    WHERE order_items.order_id = $1

    ORDER BY order_items.id;
`;


const updateOrderStatusQuery = `
    UPDATE orders
    SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    AND user_id = $3
    RETURNING *;
`;


module.exports = {
    createOrderQuery,
    createOrderItemQuery,
    getUserOrdersQuery,
    getOrderByIdQuery,
    getOrderItemsQuery,
    updateOrderStatusQuery
};