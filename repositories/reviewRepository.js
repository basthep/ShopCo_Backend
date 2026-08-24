const pool =
    require("../config/db");

const {
    getReviewsByProductIdQuery
} = require("../queries/reviewQueries");


const getReviewsByProductId =
    async (productId) => {

        const result =
            await pool.query(
                getReviewsByProductIdQuery,
                [productId]
            );

        return result.rows;
    };


module.exports = {
    getReviewsByProductId
};