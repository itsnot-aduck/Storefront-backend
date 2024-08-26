import express from 'express';
import { verifyToken } from '../auth/auth';
import {
    getAllOrderedProducts,
    getOrderedProductById,
    updateOrderedProductById,
    createOrderedProduct,
    deleteOrderedProductById,
} from '../service/orderedProducts';

const orderedProductRoutes = (app: express.Application) => {
    app.get('/ordered-products', getAllOrderedProducts);
    app.get('/ordered-products/:id', getOrderedProductById);
    app.put('/ordered-products/:id', verifyToken, updateOrderedProductById);
    app.post('/ordered-products', verifyToken, createOrderedProduct);
    app.delete('/ordered-products/:id', verifyToken, deleteOrderedProductById);
};

export default orderedProductRoutes;
