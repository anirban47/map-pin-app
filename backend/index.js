const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config({ path: "./config/.env" });

// connectDB();

const app = express();
app.use(express.json()); //Used to parse JSON bodies

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
