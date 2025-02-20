const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodation.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { validateAccommodation } = require("../middleware/validate.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["host"]),
  upload.array("images"),
  validateAccommodation,
  accommodationController.createAccommodation
);

router.get("/", accommodationController.getAllAccommodations);

router.get(
  "/host",
  authMiddleware,
  roleMiddleware(["host"]),
  accommodationController.getHostAccommodations
);

router.get("/search", accommodationController.searchAccommodations);

router.get("/:id", accommodationController.getAccommodation);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["host"]),
  upload.array("images"),
  validateAccommodation,
  accommodationController.updateAccommodation
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["host"]),
  accommodationController.deleteAccommodation
);

module.exports = router;
