const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

// Route for signup
router.post('/signup', signupValidation, signup);

// Route for login (without JWT generation)
router.post('/login', loginValidation, (req, res) => {
    const { email, password } = req.body;
    
    // Handle the login logic without JWT
    // You can either authenticate using some other method (like checking password directly)
    // or just simulate login without returning any token
    // For example:
    if (email && password) {
        // Just send a success message without JWT
        res.status(200).json({
            message: 'Login successful, no token generated.',
            success: true
        });
    } else {
        res.status(400).json({
            message: 'Email and password are required.',
            success: false
        });
    }
});

module.exports = router;
