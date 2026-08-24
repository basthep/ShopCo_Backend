const getAllProductsQuery = `
    SELECT *
    FROM products
    WHERE 1 = 1
`;

const getProductByIdQuery = `
    SELECT *
    FROM products
    WHERE id = $1;
`;

module.exports = {
    getAllProductsQuery,
    getProductByIdQuery,
};