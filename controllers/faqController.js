const faqRepository =
    require("../repositories/faqRepository");


const getFaqsByProductId =
    async (req, res, next) => {

        try {

            const productId =
                req.params.productId;

            const faqs =
                await faqRepository.getFaqsByProductId(
                    productId
                );

            res.status(200).json({

                success: true,

                faqs

            });

        } catch (error) {

            next(error);

        }
    };


module.exports = {
    getFaqsByProductId
};