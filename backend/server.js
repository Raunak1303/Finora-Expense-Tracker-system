const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://finora-expense-tracker-system.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true); 
    } else {
      return callback(new Error("Not allowed by CORS")); 
    }
  },
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.static("public"));

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const insightsRoutes = require("./routes/insightsRoutes");

app.use("/api", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/insights", insightsRoutes);

// Health route to prevent Render from sleeping
app.get("/health", (req, res) => {
  res.status(200).send("Server is awake!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
