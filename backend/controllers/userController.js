const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoSanitize = require("express-mongo-sanitize");

const sanitizeInput = (input) => mongoSanitize.sanitize(input);

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signupUser = async (req,res)=>{
    const {userName , password}= req.body

    // Validate inputs before querying the DB
    if (!userName || typeof userName !== 'string' || userName.length < 3 || userName.length > 20) {
        return res.status(400).json({ error: "Invalid username" });
    }
    if (!password || password.length < 3) {
        return res.status(400).json({ error: "Password must be at least 3 characters long" });
    }    
    try {
        // Sanitize the username to prevent NoSQL injections
        const sanitizedUserName = sanitizeInput(userName);

        // Hash password before saving to DB (ensure `User.signup` handles this securely)
        const user = await User.signup(sanitizedUserName, password);

        const token = createToken(user._id);
        res.status(200).json({ userName: sanitizedUserName, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Ensure username is sanitized
        const sanitizedUserName = sanitizeInput(userName);

        const user = await User.login(sanitizedUserName, password);
        const token = createToken(user._id);
        res.status(200).json({ userName: sanitizedUserName, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };
