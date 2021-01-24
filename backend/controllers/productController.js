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

// @desc:   Create a product
// @route:  POST /api/products/:id
// @access: Privet/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });
  if (product) {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    res.status(401);
    throw new Error('Failed to create product');
  }
});

// @desc:   Update a product
// @route:  PUT /api/products/
// @access: Privet/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(401);
    throw new Error('Product not found');
  }
});
