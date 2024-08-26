import client from '../database';

export interface Product {
    id?: string;
    name: string;
    price: number;
}

export class ProductService {
    private async executeQuery(sql: string, params: any[] = []): Promise<any> {
        const conn = await client.connect();
        try {
            const result = await conn.query(sql, params);
            return result.rows;
        } finally {
            conn.release();
        }
    }

    async getAllProducts(): Promise<Product[]> {
        const sql = 'SELECT * FROM products';
        return this.executeQuery(sql);
    }

    async getProductById(id: string): Promise<Product> {
        const sql = 'SELECT * FROM products WHERE id = $1';
        const result = await this.executeQuery(sql, [id]);
        if (result.length === 0) {
            throw new Error(`Product with id ${id} not found`);
        }
        return result[0];
    }

    async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
        const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
        const result = await this.executeQuery(sql, [product.name, product.price]);
        return result[0];
    }

    async updateProductById(id: string, product: Product): Promise<Product> {
        const currentProduct = await this.getProductById(id);
        const updatedProduct = { ...currentProduct, ...product };
        const sql = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
        const result = await this.executeQuery(sql, [updatedProduct.name, updatedProduct.price, id]);
        return result[0];
    }

    async deleteProductById(id: string): Promise<Product> {
        const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const result = await this.executeQuery(sql, [id]);
        if (result.length === 0) {
            throw new Error(`Product with id ${id} not found`);
        }
        return result[0];
    }
}
