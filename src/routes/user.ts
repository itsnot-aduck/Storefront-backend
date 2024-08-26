import express from 'express';
import { verifyToken } from '../auth/auth';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    authenticateUser,
} from '../service/user';

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyToken, getAllUsers);
    app.get('/users/:id', verifyToken, getUserById);
    app.post('/users', createUser);
    app.patch('/users/:id', verifyToken, updateUserById);
    app.delete('/users/:id', verifyToken, deleteUserById);
    app.post('/users/authenticate', authenticateUser);
};

export default userRoutes;
