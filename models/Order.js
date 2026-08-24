const Order = {
    tableName: "orders",

    columns: {
        id: "id",
        userId: "user_id",
        totalAmount: "total_amount",
        status: "status",
        createdAt: "created_at",
    },
};

module.exports = Order;