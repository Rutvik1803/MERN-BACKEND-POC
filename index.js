const express = require("express");
const app = express();
const port = 4000;
const userRoutes = require("./routes/userRouter");
const Connection = require("./database/db");

Connection("rutvik", "rutvik1803");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.use("/", [userRoutes]);
