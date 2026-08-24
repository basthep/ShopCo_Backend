const pool = require("../config/db");

const {
    getAllProductsQuery,
    getProductByIdQuery,
} = require("../queries/productQueries");


const getAllProducts = async (filters = {}) => {

    let query = getAllProductsQuery;

    const values = [];
    let index = 1;


    // Category
    if (filters.category) {

        query += ` AND sub_category = $${index}`;

        values.push(filters.category);

        index++;
    }


    // Dress Style
    if (filters.style) {

        query += ` AND category = $${index}`;

        values.push(filters.style);

        index++;
    }


    // Minimum Price
    if (filters.minPrice !== undefined) {

        query += `
            AND COALESCE(offer_price, price) >= $${index}
        `;

        values.push(Number(filters.minPrice));

        index++;
    }


    // Maximum Price
    if (filters.maxPrice !== undefined) {

        query += `
            AND COALESCE(offer_price, price) <= $${index}
        `;

        values.push(Number(filters.maxPrice));

        index++;
    }


    // Sort
    query += ` ORDER BY id DESC`;


    const result = await pool.query(
        query,
        values
    );


    return result.rows;
};


const getProductById = async (id) => {

    const result = await pool.query(
        getProductByIdQuery,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllProducts,
    getProductById,
};