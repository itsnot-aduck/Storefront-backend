import client from '../database';

export type OrderedProduct = {
    id?: string;
    orderId: string;
    productId: string;
    quantity: number;
};

export class OrderedProductsService {
    private async executeQuery(sql: string, params: any[] = []): Promise<any> {
        const conn = await client.connect();
        try {
            const result = await conn.query(sql, params);
            return result.rows;
        } finally {
            conn.release();
        }
    }

    async getAllOrderedProducts(): Promise<OrderedProduct[]> {
        const sql = 'SELECT * FROM products_orders';
        return this.executeQuery(sql);
    }

    async getOrderedProductById(id: string): Promise<OrderedProduct> {
        const sql = 'SELECT * FROM products_orders WHERE id = $1';
        const result = await this.executeQuery(sql, [id]);
        return result[0];
    }

    async updateOrderdProductById(updatedOrderedProduct: OrderedProduct, id: string): Promise<OrderedProduct> {
        const sql = `  
      UPDATE products_orders   
      SET order_id = $1, product_id = $2, quantity = $3   
      WHERE id = $4   
      RETURNING *  
    `;
        const params = [
            updatedOrderedProduct.orderId,
            updatedOrderedProduct.productId,
            updatedOrderedProduct.quantity,
            id,
        ];
        const result = await this.executeQuery(sql, params);
        return result[0];
    }

    async createOrderedProduct(orderedProduct: OrderedProduct): Promise<OrderedProduct> {
        const sql = `  
      INSERT INTO products_orders (order_id, product_id, quantity)   
      VALUES ($1, $2, $3)   
      RETURNING *  
    `;
        const params = [orderedProduct.orderId, orderedProduct.productId, orderedProduct.quantity];
        const result = await this.executeQuery(sql, params);
        return result[0];
    }

    async deleteOrderedProductById(id: string): Promise<OrderedProduct> {
        const sql = 'DELETE FROM products_orders WHERE id = $1 RETURNING *';
        const result = await this.executeQuery(sql, [id]);
        return result[0];
    }
}
