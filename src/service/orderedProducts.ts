import express, { Request, Response, NextFunction } from 'express';
import { OrderedProduct, OrderedProductsService } from '../model/orderedProducts';

const orderedProductService = new OrderedProductsService();

const handleErrors = (res: Response, err: any) => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred' });
};

export const getAllOrderedProducts = async (_req: Request, res: Response) => {
    try {
        const orderedProducts = await orderedProductService.getAllOrderedProducts();
        res.json(orderedProducts);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const getOrderedProductById = async (req: Request, res: Response) => {
    try {
        const orderedProduct = await orderedProductService.getOrderedProductById(req.params.id);
        res.json(orderedProduct);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const updateOrderedProductById = async (req: Request, res: Response) => {
    try {
        const updatedOrderedProduct = await orderedProductService.updateOrderdProductById(req.body, req.params.id);
        res.json(updatedOrderedProduct);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const createOrderedProduct = async (req: Request, res: Response) => {
    try {
        const createdOrderedProduct = await orderedProductService.createOrderedProduct(req.body);
        res.status(201).json(createdOrderedProduct);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const deleteOrderedProductById = async (req: Request, res: Response) => {
    try {
        const deleted = await orderedProductService.deleteOrderedProductById(req.params.id);
        res.json(deleted);
    } catch (err) {
        handleErrors(res, err);
    }
};
