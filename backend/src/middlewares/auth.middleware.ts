import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/user.model.js";

dotenv.config();

// define custom interface to include user in Request
export interface AuthRequest extends Request {
    user?: {
        id: string;
        userType: string;
    };
}

// middleware to verify the JWT token from the Authorization header.

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No authentication token provided."
        });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, secret) as { id: string; userType: string };

        // Check if the user still exists in the database
        const userExists = await User.findById(decoded.id).exec();
        if (!userExists) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. User no longer exists."
            });
        }

        // attach user info to the request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Authentication failed. Invalid or expired token."
        });
    }
};

// middleware to check if the authenticated user has an 'Admin' userType.

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    if (req.user.userType !== 'Admin') {
        return res.status(403).json({
            success: false,
            message: "Access denied. Administrative privileges required."
        });
    }

    next();
};