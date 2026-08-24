const getReviewsByProductIdQuery = `
    SELECT
        id,
        product_id,
        name,
        rating,
        verified,
        date,
        review,
        created_at
    FROM reviews
    WHERE product_id = $1
    ORDER BY created_at DESC;
`;


module.exports = {
    getReviewsByProductIdQuery
};