const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// @desc   Get all products (with optional search/category filter)
// @route  GET /api/products
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  })
);

// @desc   Get featured products
// @route  GET /api/products/featured
// @access Public
router.get(
  '/featured',
  asyncHandler(async (_req, res) => {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  })
);

// @desc   Get single product by slug
// @route  GET /api/products/:slug
// @access Public
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  })
);

// @desc   Create product (admin)
// @route  POST /api/products
// @access Private/Admin
router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

// @desc   Update product (admin)
// @route  PUT /api/products/:id
// @access Private/Admin
router.put(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  })
);

// @desc   Delete product (admin)
// @route  DELETE /api/products/:id
// @access Private/Admin
router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({ message: 'Product removed' });
  })
);

module.exports = router;
