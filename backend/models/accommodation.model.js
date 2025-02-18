const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    images: [
      {
        filename: String,
        path: String,
        originalname: String,
      },
    ],
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weeklyDiscount: {
      type: Number,
      default: 0,
    },
    cleaningFee: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    occupancyTaxes: {
      type: Number,
      default: 0,
    },
    enhancedCleaning: {
      type: Boolean,
      default: false,
    },
    selfCheckIn: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    specificRatings: {
      cleanliness: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      checkIn: { type: Number, default: 0 },
      accuracy: { type: Number, default: 0 },
      location: { type: Number, default: 0 },
      value: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
