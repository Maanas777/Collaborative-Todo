import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    try {
        // Generate JWT

        console.log(process.env.JWT_SECRET,"jwti")
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Token expiration
        });

        // Set the cookie with the token
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Prevent CSRF attacks
            secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
        });

        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
};
