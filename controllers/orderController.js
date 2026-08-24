const orderRepository = require("../repositories/orderRepository"); 
const cartRepository = require("../repositories/cartRepository"); 
const pool = require("../config/db");


const createOrder = async (req, res, next) => {

    const client = await pool.connect();

    try {

        const userId = req.user.id;

        const { totalAmount, items } = req.body;


        if (
            totalAmount === undefined ||
            !items ||
            items.length === 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Total amount and order items are required",
            });

        }


        await client.query("BEGIN");


        // Create order

        const order =
            await orderRepository.createOrder(
                client,
                userId,
                totalAmount,
                "Pending"
            );


        // Create order items

        for (const item of items) {

            await orderRepository.createOrderItem(
                client,
                order.id,
                item.productId,
                item.quantity,
                item.size || null,
                item.color || null,
                item.price
            );

        }


        // Clear cart

        await cartRepository.clearCart(
            client,
            userId
        );


        await client.query("COMMIT");


        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });


    } catch (error) {

        await client.query("ROLLBACK");

        next(error);

    } finally {

        client.release();

    }
};


const getOrders =
    async (req, res, next) => {

        try {

            const userId = req.user.id; 
            const orders = await orderRepository.getUserOrders( userId );


            res.status(200).json({ 
                success: true, 
                orders 
            }); 
        } catch (error) { 
            next(error); 
        }
    };


const getOrder =
    async (req, res, next) => {

        try {

            const userId = req.user.id; 
            const orderId = req.params.id;


            const order = await orderRepository.getOrderById( orderId, userId ); 
            if (!order) { 
                return res.status(404).json({ 
                    success: false, 
                    message: "Order not found" 
                }); 
            }


            const items = await orderRepository.getOrderItems( orderId );

            res.status(200).json({ 
                success: true, 
                order: {
                    ...order,
                    items
                } 
            }); 
        } catch (error) { 
            next(error); 
        }
    };


const updateOrderStatus =
    async (req, res, next) => {

        try {

            const userId = req.user.id;
            const orderId = req.params.id;

            const { status } = req.body; 
            if (!status) { 
                return res.status(400).json({ 
                    success: false, 
                    message: "Order status is required" 
                }); 
            }


            const order = await orderRepository.updateOrderStatus( orderId, userId, status ); 
            if (!order) { 
                return res.status(404).json({ 
                    success: false, 
                    message: "Order not found" 
                }); 
            }


            res.status(200).json({ 
                success: true, 
                message: "Order status updated", 
                order 
            }); 

        } catch (error) { 
            next(error); 
        }
    };


module.exports = {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
};