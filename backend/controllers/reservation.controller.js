const Reservation = require("../models/reservation.model");
const Accommodation = require("../models/accommodation.model");

// create a reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      user_id: req.userId,
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({
      message: "error creating reservation",
      error: error.message,
    });
  }
};

// get reservations by host
exports.getHostReservations = async (req, res) => {
  try {
    // find all accommodations owned by the host
    const hostAccommodations = await Accommodation.find({
      host_id: req.userId,
    });
    const accommodationIds = hostAccommodations.map(acc => acc._id);

    //find all reservations for these accommodations
    const reservations = await Reservation.find({
      accommodation_id: { $in: accommodationIds },
    })
      .populate("accommodation_id")
      .populate("user_id", "username"); // only get username from user

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "error fetching host reservations",
      error: error.message,
    });
  }
};

// get reservations by user
exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user_id: req.userId })
      .populate("accommodation_id")
      .populate("user_id", "username");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "error fetching user reservations",
      error: error.message,
    });
  }
};

//delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "reservation not found" });
    }

    // check if user owns this reservation
    if (reservation.user_id.toString() !== req.userId) {
      return res.status(403).json({
        message: "not authorized to delete this reservation",
      });
    }

    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "error deleting reservation",
      error: error.message,
    });
  }
};
