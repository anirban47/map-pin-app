const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const pinRoutes = require("./routes/pinRoutes");
require("dotenv").config({ path: "./config/.env" });

connectDB();

const app = express();
app.use(express.json({ urlencoded: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/users", userRoutes);
app.use("/api/pins", pinRoutes);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
