import supertest from 'supertest';
import { app } from '../server';
import { ProductService } from '../model/products';

const request = supertest(app); //req object
const product = new ProductService();

describe('Test product endpoints', () => {
    it('Get Products', async () => {
        const res = await request.get('/products');
        expect(res.status).toBeTrue;
    });
    it('Post Products', async () => {
        const res = await request.post('/products');
        expect(res.status).toBeTrue;
    });
    it('Delete Products', async () => {
        const res = await request.delete(`/products/2`); //assuming that there is ID 2 in products database
        expect(res.status).toBeTrue;
    });
    it('Update Products', async () => {
        const res = await request.put('/products/2'); //assuming that there is ID 2 in products database
        expect(res.status).toBeTrue;
    });
});

describe('Products functions', () => {
    it('Products should have create method', async () => {
        expect(product.createProduct).toBeDefined();
    });
    it('Products should have read method', async () => {
        expect(product.getAllProducts).toBeDefined();
    });
    it('Products should have update method', async () => {
        expect(product.updateProductById).toBeDefined();
    });
    it('Products should have delete method', async () => {
        expect(product.deleteProductById).toBeDefined();
    });
});
