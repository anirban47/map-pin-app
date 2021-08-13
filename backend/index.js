const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
    .connect(process.env.MONGODB_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
