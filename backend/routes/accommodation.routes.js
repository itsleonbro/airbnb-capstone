const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodation.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { validateAccommodation } = require("../middleware/validate.middleware");

router.post(
  "/",
  authMiddleware,
  upload.array("images"),
  validateAccommodation,
  accommodationController.createAccommodation
);

router.get("/", accommodationController.getAllAccommodations);

router.get(
  "/host",
  authMiddleware,
  accommodationController.getHostAccommodations
);

router.get("/:id", accommodationController.getAccommodation);

router.put(
  "/:id",
  authMiddleware,
  upload.array("images"),
  validateAccommodation,
  accommodationController.updateAccommodation
);

router.delete(
  "/:id",
  authMiddleware,
  accommodationController.deleteAccommodation
);

module.exports = router;
