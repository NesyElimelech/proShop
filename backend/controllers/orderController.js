import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc:   Create new order.
// @route:  POST /api/orders
// @access: Privet
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const user = req.user._id;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
