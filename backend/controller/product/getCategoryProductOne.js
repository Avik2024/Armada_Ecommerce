const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    // Aggregation query to group by category and fetch one product from each category
    const productsByCategory = await productModel.aggregate([
      {
        $group: {
          _id: "$category", // Group by category
          product: { $first: "$$ROOT" } // Get the first product in each category
        }
      },
      {
        $replaceRoot: { newRoot: "$product" } // Replace the root with the product data
      }
    ]);

    res.json({
      message: "Products by category",
      data: productsByCategory,
      success: true,
      error: false
    });

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false
    });
  }
};

module.exports = getCategoryProduct;
