import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// JWT authentication
export const verifyToken = (req: Request, res: Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};
