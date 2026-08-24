const Review = {
    tableName: "reviews",

    columns: {
        id: "id",
        productId: "product_id",
        userId: "user_id",
        name: "name",
        rating: "rating",
        review: "review",
        verified: "verified",
    },
};

module.exports = Review;