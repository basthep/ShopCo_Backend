const express =
    require("express");

const {
    getReviewsByProductId
} = require("../controllers/reviewController");

const router =
    express.Router();


router.get(
    "/:productId/reviews",
    getReviewsByProductId
);


module.exports = router;