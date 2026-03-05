const express = require('express');
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// @desc   Get logged-in user orders
// @route  GET /api/orders/my
// @access Private
router.get(
  '/my',
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  })
);

// @desc   Get all orders (admin)
// @route  GET /api/orders
// @access Private/Admin
router.get(
  '/',
  protect,
  admin,
  asyncHandler(async (_req, res) => {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  })
);

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
router.get(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    // Only admin or the order owner can view it
    if (
      !req.user.isAdmin &&
      order.user &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
    res.json(order);
  })
);

// @desc   Mark order as delivered (admin)
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
router.put(
  '/:id/deliver',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updated = await order.save();
    res.json(updated);
  })
);

module.exports = router;
