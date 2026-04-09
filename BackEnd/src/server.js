// const express = require("express");
// const app = express();

// app.use(express.json());

// // Import routes
// const hospitalRoutes = require("./routes/hospitalRoutes");
// const patientRoutes = require("./routes/patientRoutes");
// const triageRoutes = require("./routes/triageRoutes");
// const tokenRoutes = require("./routes/tokenRoutes");

// // Use routes
// app.use("/api/hospitals", hospitalRoutes);
// app.use("/api/patients", patientRoutes);
// app.use("/api/triage", triageRoutes);
// app.use("/api/tokens", tokenRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

require("dotenv").config({ path: "../.env" });

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});