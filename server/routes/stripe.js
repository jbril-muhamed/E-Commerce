const express = require('express');
const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');

const router = express.Router();

// @desc   Create Stripe checkout session
// @route  POST /api/stripe/checkout
// @access Public (guest checkout supported)
router.post(
  '/checkout',
  asyncHandler(async (req, res) => {
    const { cartItems, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      res.status(400);
      throw new Error('No items in cart');
    }

    // Validate products and build line items
    const lineItems = [];
    const orderItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${item._id}`);
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: product.image ? [product.image] : [],
          },
          unit_amount: Math.round(product.price * 100), // cents
        },
        quantity: item.quantity,
      });

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order record (pending payment)
    const order = await Order.create({
      user: userId || null,
      items: orderItems,
      totalPrice,
    });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/cancel`,
      metadata: { orderId: order._id.toString() },
    });

    res.json({ url: session.url, orderId: order._id });
  })
);

// @desc   Stripe webhook – mark order as paid
// @route  POST /api/stripe/webhook
// @access Stripe (raw body required)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata && session.metadata.orderId;

      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          isPaid: true,
          paidAt: new Date(),
          stripeSessionId: session.id,
          'shippingAddress.name': session.customer_details
            ? session.customer_details.name
            : '',
          'shippingAddress.email': session.customer_details
            ? session.customer_details.email
            : '',
        });
      }
    }

    res.json({ received: true });
  })
);

// @desc   Verify session after redirect from Stripe
// @route  GET /api/stripe/session/:sessionId
// @access Public
router.get(
  '/session/:sessionId',
  asyncHandler(async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId
    );
    const order = await Order.findOne({
      stripeSessionId: session.id,
    });
    res.json({ session, order });
  })
);

module.exports = router;
