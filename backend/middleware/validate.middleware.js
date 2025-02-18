const validateAccommodation = (req, res, next) => {
  const { title, location, price, description } = req.body;

  if (!title || !location || !price || !description) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  next();
};

const validateReservation = (req, res, next) => {
  const { checkIn, checkOut, guests } = req.body;

  if (!checkIn || !checkOut || !guests) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  next();
};

module.exports = {
  validateAccommodation,
  validateReservation,
};
