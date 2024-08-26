import express, { Request, Response, NextFunction } from 'express';
import { Order, OrderService } from '../model/orders';
import jwt from 'jsonwebtoken';

const orderService = new OrderService();

const handleErrors = (res: Response, err: any) => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred' });
};

export const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderById = await orderService.getOrderById(req.params.id);
        res.json(orderById);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const updateOrderById = async (req: Request, res: Response) => {
    try {
        const updatedOrder = await orderService.updateOrderById(req.params.id, req.body);
        res.json(updatedOrder);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const createdOrder = await orderService.createOrder(req.body);
        res.status(201).json(createdOrder);
    } catch (err) {
        handleErrors(res, err);
    }
};

export const deleteOrderById = async (req: Request, res: Response) => {
    try {
        const deleted = await orderService.deleteOrderById(req.params.id);
        res.json(deleted);
    } catch (err) {
        handleErrors(res, err);
    }
};
