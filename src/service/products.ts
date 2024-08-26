import express, { Request, Response, NextFunction } from 'express';
import { Product, ProductService } from '../model/products';
import { verifyToken } from '../auth/auth';

const productService = new ProductService();

const handleErrors = (res: Response, err: any) => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred' });
};

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const updateProductById = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await productService.updateProductById(req.params.id, req.body);
        res.json(updatedProduct);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const createdProduct = await productService.createProduct(req.body);
        res.status(201).json(createdProduct);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const deleted = await productService.deleteProductById(req.params.id);
        res.json(deleted);
    } catch (err) {
        handleErrors(res, err);
    }
};
