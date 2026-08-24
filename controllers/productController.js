const productRepository = require("../repositories/productRepository");

const getAllProducts = async (req, res, next) => {

  try {

    const filters = {
            category: req.query.category,
            style: req.query.style, 
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
        }; 
        

    const products =
            await productRepository.getAllProducts(filters);

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    next(error);

  }

};


const getProductById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const product =
            await productRepository.getProductById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllProducts,
    getProductById,
};