import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip(skip)
      .exec();

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};