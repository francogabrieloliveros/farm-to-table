import User, { type IUser } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export interface AuthResponse {
    _id: string;
    firstName: string;
    email: string;
    userType: string;
    token: string;
}

export class AuthService {
    // Register a new user

    static async registerUser(userData: Partial<IUser>): Promise<AuthResponse> {
        const { email } = userData;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }

        // Create user 
        const user = await User.create(userData);

        return {
            _id: user._id.toString(),
            firstName: user.firstName,
            email: user.email,
            userType: user.userType,
            token: this.generateToken(user._id.toString(), user.userType),
        };
    }

    // login user and return token

    static async loginUser(email: string, password: string): Promise<AuthResponse> {
        // we must explicitly select password because it's set to 'select: false' in the schema
        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            return {
                _id: user._id.toString(),
                firstName: user.firstName,
                email: user.email,
                userType: user.userType,
                token: this.generateToken(user._id.toString(), user.userType),
            };
        } else {
            throw new Error('Invalid email or password');
        }
    }

    // generate jwt token
    private static generateToken(id: string, userType: string): string {
        const secret = process.env.JWT_SECRET || 'secret';
        const expiresIn = (process.env.JWT_EXPIRES_IN as any) || '3h';

        return jwt.sign({ id, userType }, secret, {
            expiresIn,
        });
    }
}

