const express =
    require("express");

const {
    getFaqsByProductId
} = require("../controllers/faqController");

const router =
    express.Router();


router.get(
    "/:productId/faqs",
    getFaqsByProductId
);


module.exports = router;