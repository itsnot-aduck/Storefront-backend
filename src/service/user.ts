import express, { Request, Response } from 'express';
import { UserService, User } from '../model/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// make a new instance
const userService = new UserService();

const handleErrors = (res: Response, err: any) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
};

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const updateUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUserById(req.body, req.params.id);
        res.json(user);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.status(201).json({ user: user, token });
    } catch (err) {
        handleErrors(res, err);
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUserById(req.params.id);
        res.json(user);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { id, password } = req.body;
        const authenticatedUser = await userService.authenticateUser(id, password);
        if (!authenticatedUser) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: authenticatedUser.id }, process.env.JWT_SECRET!);
        res.json({ user: authenticatedUser, token });
    } catch (err) {
        handleErrors(res, err);
    }
};
