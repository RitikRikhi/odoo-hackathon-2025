const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());

// 🔐 ENV
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/jwt_demo";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 🧠 MongoDB User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

// 🔑 Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

// 🛡️ Middleware to protect routes
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ msg: "No token provided" });
  }
};

// 🌐 Root Route — Show Server Info
app.get("/", (req, res) => {
  const serverURL = `http://localhost:${PORT}`;
  res.json({
    msg: "✅ Server is running",
    server: serverURL,
    docs: `${serverURL}/api/profile`,
  });
});

// 🚀 Register
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// 🔓 Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// 🔐 Protected Route
app.get("/api/profile", protect, (req, res) => {
  res.json({
    msg: "Welcome to your profile",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

// 🧠 Connect DB and Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    const serverURL = `http://localhost:${PORT}`;
    app.listen(PORT, () =>
      console.log(`✅ Server running at ${serverURL}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
