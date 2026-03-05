const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Banner image is required'],
    },
    product: {
      type: String,
      trim: true,
      default: '',
    },
    buttonText: {
      type: String,
      trim: true,
      default: 'Shop Now',
    },
    heading: {
      type: String,
      trim: true,
      default: '',
    },
    desc: {
      type: String,
      trim: true,
      default: '',
    },
    smallText: {
      type: String,
      trim: true,
      default: '',
    },
    midText: {
      type: String,
      trim: true,
      default: '',
    },
    largeText1: {
      type: String,
      trim: true,
      default: '',
    },
    largeText2: {
      type: String,
      trim: true,
      default: '',
    },
    discount: {
      type: String,
      trim: true,
      default: '',
    },
    saleTime: {
      type: String,
      trim: true,
      default: '',
    },
    isHero: {
      type: Boolean,
      default: false,
    },
    isFooter: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;
