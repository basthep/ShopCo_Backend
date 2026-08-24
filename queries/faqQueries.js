const getFaqsByProductIdQuery = `
    SELECT
        id,
        product_id,
        question,
        answer,
        created_at
    FROM faqs
    WHERE product_id = $1
    ORDER BY id;
`;


module.exports = {
    getFaqsByProductIdQuery
};