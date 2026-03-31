const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection
mongoose.connect("mongodb+srv://eshwarkarthik93_db_user:test123@cluster0.pgsj9ox.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/tasks", require("./routes/tasks"));

// Test Route (optional)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});