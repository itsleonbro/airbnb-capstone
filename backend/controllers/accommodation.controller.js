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
