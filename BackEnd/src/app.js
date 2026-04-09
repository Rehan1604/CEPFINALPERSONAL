const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const triageRoutes = require("./routes/triageRoutes");
const tokenRoutes = require("./routes/tokenRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/triage", triageRoutes);
app.use("/api/token", tokenRoutes);

// test route
app.get("/", (req, res) => {
  res.send("MediRoute API running 🚀");
});

module.exports = app;