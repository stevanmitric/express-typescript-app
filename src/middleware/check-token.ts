import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request {
 user?: any;
}

export const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    
    const auth = req.headers['authorization'] || req.query.token || req.body.token;

    if (!auth) {
        return res.status(403).send('No token provided');
    }

    const token = auth.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};