import express from 'express';
import { verifyToken } from '../auth/auth';
import {
    getAllProducts,
    getProductById,
    updateProductById,
    createProduct,
    deleteProductById,
} from '../service/products';

const productRoutes = (app: express.Application) => {
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);
    app.put('/products/:id', verifyToken, updateProductById);
    app.post('/products', verifyToken, createProduct);
    app.delete('/products/:id', verifyToken, deleteProductById);
};

export default productRoutes;
