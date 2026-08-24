const {
    createOrderQuery,
    createOrderItemQuery,
    getUserOrdersQuery,
    getOrderByIdQuery,
    getOrderItemsQuery,
    updateOrderStatusQuery
} = require("../queries/orderQueries");

const pool = require("../config/db");


const createOrder =
    async (
        client,
        userId,
        totalAmount,
        status
    ) => {

        const result =
            await client.query(
                createOrderQuery,
                [
                    userId,
                    totalAmount,
                    status
                ]
            );

        return result.rows[0];
    };


const createOrderItem =
    async (
        client,
        orderId,
        productId,
        quantity,
        size,
        color,
        price
    ) => {

        const result =
            await client.query(
                createOrderItemQuery,
                [
                    orderId,
                    productId,
                    quantity,
                    size,
                    color,
                    price
                ]
            );

        return result.rows[0];
    };


const getUserOrders =
    async (userId) => {

        const result =
            await pool.query(
                getUserOrdersQuery,
                [userId]
            );

        return result.rows;
    };


const getOrderById =
    async (
        orderId,
        userId
    ) => {

        const result =
            await pool.query(
                getOrderByIdQuery,
                [
                    orderId,
                    userId
                ]
            );

        return result.rows[0];
    };


const getOrderItems =
    async (orderId) => {

        const result =
            await pool.query(
                getOrderItemsQuery,
                [orderId]
            );

        return result.rows;
    };


const updateOrderStatus =
    async (
        orderId,
        userId,
        status
    ) => {

        const result =
            await pool.query(
                updateOrderStatusQuery,
                [
                    status,
                    orderId,
                    userId
                ]
            );

        return result.rows[0];
    };


module.exports = {
    createOrder,
    createOrderItem,
    getUserOrders,
    getOrderById,
    getOrderItems,
    updateOrderStatus
};