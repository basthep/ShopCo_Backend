const Cart = {
    tableName: "cart",

    columns: {
        id: "id",
        userId: "user_id",
        productId: "product_id",
        quantity: "quantity",
        size: "size",
        color: "color",
        price: "price",
    },
};

module.exports = Cart;