const express = require("express");
const app = express();
const port = 4000;
const userRoutes = require("./routes/userRouter");
const authRoutes = require("./routes/authRouter");
const Connection = require("./database/db");
const cors = require("cors");

Connection("rutvik", "rutvik1803");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/api", [userRoutes, authRoutes]);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: "False",
    message,
    statusCode,
  });
});
