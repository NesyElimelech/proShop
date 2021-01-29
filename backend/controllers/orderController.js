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

// @desc:   Fetch order by Id.
// @route:  GET /api/order/:id
// @access: Privet
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc:   Update order to paid
// @route:  PUT /api/order/:id/pay
// @access: Privet
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const id = req.body.id;
  const status = req.body.status;
  const update_time = req.body.update_time;
  const email_address = req.body.payer.email_address;
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc:   Get logged in user orders
// @route:  GET /api/orders/myorders
// @access: Privet
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc:   Get all orders
// @route:  GET /api/orders/
// @access: Privet/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Order.countDocuments();
  const orders = await Order.find({})
    .populate('user', 'id name')
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

// @desc:   Update order to delivered
// @route:  PUT /api/order/:id/deliver
// @access: Privet/Admin

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
