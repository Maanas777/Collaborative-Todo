import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);


// Protected Routes Example
router.get('/profile', protectRoute, (req, res) => {
    res.status(200).json({ user: req.user });
});

export default router;
