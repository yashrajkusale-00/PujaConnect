const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PujaConnect API running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pandit", require("./routes/pandit.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

module.exports = app;
