
import express from 'express'
import { getUserById } from '../controllers/user.controller.js';
const router = express.Router();


router.get('/users/:userId', getUserById);

export default router
