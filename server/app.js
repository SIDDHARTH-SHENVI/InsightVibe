const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contentController = require("./controllers/contentController");

const app = express();
const PORT = 1312;

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Adjust as per frontend URL
app.use(express.json());

// Routes
app.post("/generate-intro-prompt", contentController.generateIntroAndImage);

// Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
