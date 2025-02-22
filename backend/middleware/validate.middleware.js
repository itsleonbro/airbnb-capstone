const validateAccommodation = (req, res, next) => {
  const { title, location, price, description } = req.body;

  //checking for all the required fields
  if (!title || !location || !price || !description) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  // validatin the types and formats
  if (typeof title !== "string" || title.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "Title must be at least 3 characters long" });
  }

  if (typeof location !== "string" || location.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "Location must be at least 3 characters long" });
  }

  if (typeof description !== "string" || description.trim().length < 10) {
    return res
      .status(400)
      .json({ message: "Description must be at least 10 characters long" });
  }

  // clean inputs
  req.body.title = title.trim();
  req.body.location = location.trim();
  req.body.description = description.trim();

  next();
};

const validateReservation = (req, res, next) => {
  const { checkIn, checkOut, guests } = req.body;

  if (!checkIn || !checkOut || !guests) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  // validate guests
  if (!Number.isInteger(guests) || guests < 1) {
    return res
      .status(400)
      .json({ message: "Number of guests must be a positive integer" });
  }

  next();
};

module.exports = {
  validateAccommodation,
  validateReservation,
};
