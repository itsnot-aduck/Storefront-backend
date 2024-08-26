import express from 'express';
import { verifyToken } from '../auth/auth';
import { getAllOrders, getOrderById, updateOrderById, createOrder, deleteOrderById } from '../service/orders';

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyToken, getAllOrders);
    app.get('/orders/:id', verifyToken, getOrderById);
    app.put('/orders/:id', verifyToken, updateOrderById);
    app.post('/orders', verifyToken, createOrder);
    app.delete('/orders/:id', verifyToken, deleteOrderById);
};

export default orderRoutes;
