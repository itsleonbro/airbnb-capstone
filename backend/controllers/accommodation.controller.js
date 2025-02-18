const Accommodation = require("../models/accommodation.model");

// create new accommodation
exports.createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation({
      ...req.body,
      host_id: req.userId, // from auth middleware
      images: req.files
        ? req.files.map(file => ({
            filename: file.filename,
            path: file.path,
            originalname: file.originalname,
          }))
        : [],
    });

    const savedAccommodation = await accommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    res.status(500).json({
      message: "Error creating accommodation",
      error: error.message,
    });
  }
};

// get all accommodations
exports.getAllAccommodations = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice, guests } = req.query;

    const filter = {};
    if (location) filter.location = new RegExp(location, "i");
    if (type) filter.type = type;
    if (guests) filter.guests = { $gte: parseInt(guests) };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    const accommodations = await Accommodation.find(filter);
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching accommodations",
      error: error.message,
    });
  }
};

// get single accommodation by ID
exports.getAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching accommodation",
      error: error.message,
    });
  }
};

// get accommodations by host
exports.getHostAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ host_id: req.userId });
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching host accommodations",
      error: error.message,
    });
  }
};

