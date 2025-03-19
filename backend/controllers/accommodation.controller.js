const Accommodation = require("../models/accommodation.model");
const fs = require("fs");
const path = require("path");

const deleteFile = filePath => {
  const fullPath = path.join(__dirname, "..", "..", filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// create new accommodation
exports.createAccommodation = async (req, res) => {
  try {
    // validate required fields
    const requiredFields = ["title", "type", "location", "price", "guests"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Missing required field: ${field}`,
          success: false,
        });
      }
    }

    // Validate price and guests are numbers
    if (isNaN(req.body.price) || isNaN(req.body.guests)) {
      return res.status(400).json({
        message: "Price and guests must be valid numbers",
        success: false,
      });
    }

    // process uploaded files
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        originalname: file.originalname,
      }));
    }

    const accommodation = new Accommodation({
      ...req.body,
      host_id: req.userId, // from auth middleware
      images: images,
      createdAt: new Date(),
    });

    const savedAccommodation = await accommodation.save();

    return res.status(201).json({
      message: "Accommodation created successfully",
      data: savedAccommodation,
      success: true,
    });
  } catch (error) {
    console.error("Error creating accommodation:", error);
    return res.status(500).json({
      message: "Error creating accommodation",
      error: error.message,
      success: false,
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

// update accommodation
exports.updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    // check if user is the host
    if (accommodation.host_id.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this accommodation" });
    }

    // handle image updates if files are included
    const updateData = { ...req.body };

    if (req.body.imagesToDelete) {
      try {
        const imagesToDelete = JSON.parse(req.body.imagesToDelete);

        accommodation.images = accommodation.images.filter(image => {
          const shouldDelete = imagesToDelete.includes(image._id.toString());

          if (shouldDelete) {
            try {
              deleteFile(image.path);
            } catch (fileError) {
              console.error("Error deleting file:", fileError);
            }
          }

          return !shouldDelete;
        });
      } catch (parseError) {
        console.error("Error parsing imagesToDelete:", parseError);
      }
    }

    // process new images if any
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        originalname: file.originalname,
      }));

      // merge with existing images
      updateData.images = [...accommodation.images, ...newImages];
    } else {
      // keep existing images (minus any deleted ones)
      updateData.images = accommodation.images;
    }

    const updatedAccommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedAccommodation);
  } catch (error) {
    res.status(500).json({
      message: "Error updating accommodation",
      error: error.message,
    });
  }
};

// delete accommodation
exports.deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    // check if user is the host
    if (accommodation.host_id.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this accommodation" });
    }

    // delet associated image files
    if (accommodation.images && accommodation.images.length > 0) {
      accommodation.images.forEach(image => {
        try {
          deleteFile(image.path);
        } catch (fileError) {
          console.error("Error deleting file:", fileError);
        }
      });
    }

    await Accommodation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting accommodation",
      error: error.message,
    });
  }
};

// search accommodations
exports.searchAccommodations = async (req, res) => {
  try {
    const { query } = req.query;

    const accommodations = await Accommodation.find({
      $or: [
        { title: new RegExp(query, "i") },
        { location: new RegExp(query, "i") },
        { type: new RegExp(query, "i") },
        { description: new RegExp(query, "i") },
      ],
    });

    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({
      message: "Error searching accommodations",
      error: error.message,
    });
  }
};
