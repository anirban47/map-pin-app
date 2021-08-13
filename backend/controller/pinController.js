const Pin = require("../models/Pin");

// GET /api/pins
// returns all pins
const getPins = async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json({
            success: true,
            data: pins,
            count: pins.length,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// POST /api/pins
// adds a new pin
const addPin = async (req, res, next) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getPins,
    addPin,
};
