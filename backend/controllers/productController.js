import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc:   Fetch all products
// @route:  GET /api/products
// @access: Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
  res.status(200);
});

// @desc:   Fetch single product
// @route:  GET /api/products/:id
// @access: Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
    res.status(200);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc:   Delete product
// @route:  DELETE /api/products/:id
// @access: Privet/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
