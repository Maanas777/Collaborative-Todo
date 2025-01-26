import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
        }

        // Find the user in the database
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password from the result
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user data to the request object for use in next middleware/controllers
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in protectRoute middleware:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized - Token Expired' });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
};
