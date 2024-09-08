import supertest from 'supertest';
import { app } from '../server';
import { OrderedProductsService } from '../model/orderedProducts';

const request = supertest(app); //req object
const orderedProduct = new OrderedProductsService();

describe('Test ordered products endpoints', () => {
    it('Get Ordered Products', async () => {
        const res = await request.get('/ordered/product');
        expect(res.status).toBeTrue;
    });
    it('Post Ordered Products', async () => {
        const res = await request.post('/ordered/product');
        expect(res.status).toBeTrue;
    });
    it('Delete Ordered Products', async () => {
        const res = await request.delete(`/ordered/product/2`); //assuming that there is ID 2 in products database
        expect(res.status).toBeTrue;
    });
    it('Update Ordered Products', async () => {
        const res = await request.put('/ordered/product/2'); //assuming that there is ID 2 in products database
        expect(res.status).toBeTrue;
    });
});

describe('Ordered Products functions', () => {
    it('Ordered Products should have create method', async () => {
        expect(orderedProduct.createOrderedProduct).toBeDefined();
    });
    it('Ordered Products should have read method', async () => {
        expect(orderedProduct.getAllOrderedProducts).toBeDefined();
    });
    it('Ordered Products should have update method', async () => {
        expect(orderedProduct.updateOrderedProductById).toBeDefined();
    });
    it('Ordered Products should have delete method', async () => {
        expect(orderedProduct.deleteOrderedProductById).toBeDefined();
    });
});
