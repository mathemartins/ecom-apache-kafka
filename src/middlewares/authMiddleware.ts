import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = 'your-secret-key';

interface CustomRequest extends Request {
    user?: JwtPayload;
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Extract the JWT token from the Authorization header
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ error: 'Authentication failed. Token missing' });
    }

    try {
        // Verify the JWT token using the secret key
        // Attach the decoded payload to the request for use in subsequent middleware or route handlers
        req.user = jwt.verify(token, secretKey) as JwtPayload;

        console.log('Authentication successful');
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Authentication failed:', error);
        res.status(401).json({ error: 'Authentication failed. Invalid token' });
    }
};

// Helper function to extract the JWT token from the Authorization header
const extractToken = (req: Request): string | null => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Remove 'Bearer ' from the beginning of the token
        return authHeader.slice(7);
    }
    return null;
};