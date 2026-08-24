const OrderItem = {
    tableName: "order_items",

    columns: {
        id: "id",
        orderId: "order_id",
        productId: "product_id",
        quantity: "quantity",
        size: "size",
        color: "color",
        price: "price",
    },
};

module.exports = OrderItem;