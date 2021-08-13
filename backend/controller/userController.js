const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// POST /api/users/register
// add a new user to the application
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        res.status(200).json({
            success: true,
            data: user._id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

// POST /api/users/login
// login an existing user to the application
const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({
            username: username,
        });
        if (!user) res.status(400).json("User not found");

        const isValidPassword = bcrypt.compare(password, user.password);
        if (isValidPassword)
            res.status(200).json({
                _id: user._id,
                username: username,
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    registerUser,
    loginUser,
};
