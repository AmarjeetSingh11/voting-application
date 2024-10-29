const Jwt = require('jsonwebtoken');
const Config = require('../config/config');
const User = require('../models/user');

async function handlerUserVerifytoken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    try {
        // Verify the token
        const user = Jwt.verify(token, Config.jwtSecret);
        req.userId = user.id; // Use user.id here after verification
        
        // Fetch user from the database
        const dbUser = await User.findById(req.userId); // Use findById
        if (!dbUser) {
            return res.sendStatus(404); // User not found
        }

        req.user = dbUser._id; // Attach the user object to the request
        console.log(`User Id: ${req.userId}`);
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.sendStatus(403);
    }
}

module.exports = handlerUserVerifytoken;
