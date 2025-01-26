import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
    console.log('user')
    const { username, email, password } = req.body;
    console.log(req.body, "npdd")

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        generateToken(newUser._id, res);

        res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id, res); 

        res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email }, token });
    } catch (error) {
        console.error("Error in loginUser:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: "Logout successful" });
};
