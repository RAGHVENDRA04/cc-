const Joi = require('joi');

// Signup Validation middleware
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(), // Name is required, between 3 and 100 characters.
        email: Joi.string().email().required(), // Email must be in valid format.
        password: Joi.string().min(4).max(100).required() // Password must be between 4 and 100 characters.
    });
    
    // Validate the request body against the schema
    const { error } = schema.validate(req.body);
    
    // If validation fails, return error response
    if (error) {
        return res.status(400).json({
            message: "Bad request", 
            error: error.details[0].message // Provide detailed error message
        });
    }

    // If validation passes, continue to the next middleware or route handler
    next();
};

// Login Validation middleware
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(), // Email must be in valid format.
        password: Joi.string().min(4).max(100).required() // Password must be between 4 and 100 characters.
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body);

    // If validation fails, return error response
    if (error) {
        return res.status(400).json({
            message: "Bad request", 
            error: error.details[0].message // Provide detailed error message
        });
    }

    // If validation passes, continue to the next middleware or route handler
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
