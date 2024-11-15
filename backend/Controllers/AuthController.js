const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");

// Signup Function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists, you can log in', success: false });
        }
        
        // Create new user with hashed password
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Login Function (No JWT token, just email and name)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed: Incorrect email or password';

        // If user doesn't exist, return error
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Compare entered password with stored hashed password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Send successful response with user details (no JWT token)
        res.status(200).json({
            message: "Login successful",
            success: true,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
