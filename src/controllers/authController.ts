import { Request, Response } from 'express';
import User from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully' ,
            user: {
                id: newUser.id,
                username: newUser.username,
            }
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        // Check if the user exists and the password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate JWT
            const token = jwt.sign({userId: user.id, username: user.username},
                'your-secret-key',
                {expiresIn: '1h'}
            )
            return res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                },
            });
        }

        // Respond with an error if authentication fails
        res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};