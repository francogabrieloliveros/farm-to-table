import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

//    Register a new user
export const postSignUp = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const user = await AuthService.registerUser({
            firstName,
            lastName,
            email,
            password
        });
        res.status(201).json(user);
    } catch (error: any) {
        // If user already exists, it's a Bad Request (400)
        res.status(400).json({ message: error.message });
    }
};

// Authenticate user & get token
export const postLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await AuthService.loginUser(email, password);
        res.status(200).json(user);
    } catch (error: any) {
        // Unauthorized (401) for login failures
        res.status(401).json({ message: 'Invalid email or password' });
    }
};