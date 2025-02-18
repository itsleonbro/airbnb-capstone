const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { validateReservation } = require("../middleware/validate.middleware");

router.post(
  "/",
  authMiddleware,
  validateReservation,
  reservationController.createReservation
);

router.get("/host", authMiddleware, reservationController.getHostReservations);

router.get("/user", authMiddleware, reservationController.getUserReservations);

router.delete("/:id", authMiddleware, reservationController.deleteReservation);

module.exports = router;
