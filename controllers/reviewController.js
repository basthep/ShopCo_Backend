const reviewRepository =
    require("../repositories/reviewRepository");


const getReviewsByProductId =
    async (req, res, next) => {

        try {

            const productId =
                req.params.productId;

            const reviews =
                await reviewRepository.getReviewsByProductId(
                    productId
                );

            res.status(200).json({

                success: true,

                reviews

            });

        } catch (error) {

            next(error);

        }
    };


module.exports = {
    getReviewsByProductId
};