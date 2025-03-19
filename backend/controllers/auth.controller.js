const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// sign up controller
exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Username and password must be strings" });
    }

    if (username.length < 3 || username.length > 25) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 25 characters" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // validate role
    const validRoles = ["user", "host"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid input data", errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Internal server error while creating user" });
  }
};

// login controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );

    res.status(200).json({
      token,
      userId: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
