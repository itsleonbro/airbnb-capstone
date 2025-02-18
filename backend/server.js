const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authMiddleware = require("./middleware/auth.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const {
  validateAccommodation,
  validateReservation,
} = require("./middleware/validate.middleware");

const userRoutes = require("./routes/user.routes");
const accommodationRoutes = require("./routes/accommodation.routes");
const reservationRoutes = require("./routes/reservation.routes");

require("dotenv").config();

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

//routes
app.use("/api/users", userRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/reservations", reservationRoutes);

// errror middleware
app.use(errorMiddleware);

// start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
