const pool =
    require("../config/db");

const {
    getFaqsByProductIdQuery
} = require("../queries/faqQueries");


const getFaqsByProductId =
    async (productId) => {

        const result =
            await pool.query(
                getFaqsByProductIdQuery,
                [productId]
            );

        return result.rows;
    };


module.exports = {
    getFaqsByProductId
};