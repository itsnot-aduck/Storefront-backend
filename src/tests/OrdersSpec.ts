import supertest from 'supertest';
import { app } from '../server';
import { OrderService } from '../model/orders';

const request = supertest(app); //req object
const order = new OrderService();

describe('Test product endpoints', () => {
    it('Get Orders', async () => {
        const res = await request.get('/orders');
        expect(res.status).toBeTrue;
    });
    it('Post Orders', async () => {
        const res = await request.post('/orders');
        expect(res.status).toBeTrue;
    });
    it('Delete Orders', async () => {
        const res = await request.delete(`/orders/2`); //assuming that there is ID 2 in products database
        expect(res.status).toBeTrue;
    });
    it('Update Orders', async () => {
        const res = await request.put('/orders/2'); //assuming that there is ID 2 in products database
        expect(res.status).toBeTrue;
    });
});

describe('Orders functions', () => {
    it('Orders should have create method', async () => {
        expect(order.createOrder).toBeDefined();
    });
    it('Orders should have read method', async () => {
        expect(order.getAllOrders).toBeDefined();
    });
    it('Orders should have update method', async () => {
        expect(order.updateOrderById).toBeDefined();
    });
    it('Orders should have delete method', async () => {
        expect(order.deleteOrderById).toBeDefined();
    });
});
