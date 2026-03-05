const express = require('express');
const asyncHandler = require('express-async-handler');
const Banner = require('../models/Banner');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

// @desc   Get all banners
// @route  GET /api/banners
// @access Public
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  })
);

// @desc   Get hero banners
// @route  GET /api/banners/hero
// @access Public
router.get(
  '/hero',
  asyncHandler(async (_req, res) => {
    const banners = await Banner.find({ isHero: true });
    res.json(banners);
  })
);

// @desc   Get footer banners
// @route  GET /api/banners/footer
// @access Public
router.get(
  '/footer',
  asyncHandler(async (_req, res) => {
    const banners = await Banner.find({ isFooter: true });
    res.json(banners);
  })
);

// @desc   Create banner (admin)
// @route  POST /api/banners
// @access Private/Admin
router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  })
);

// @desc   Update banner (admin)
// @route  PUT /api/banners/:id
// @access Private/Admin
router.put(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!banner) {
      res.status(404);
      throw new Error('Banner not found');
    }
    res.json(banner);
  })
);

// @desc   Delete banner (admin)
// @route  DELETE /api/banners/:id
// @access Private/Admin
router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      res.status(404);
      throw new Error('Banner not found');
    }
    res.json({ message: 'Banner removed' });
  })
);

module.exports = router;
