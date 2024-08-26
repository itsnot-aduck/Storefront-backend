import client from '../database';

export interface Order {
    id?: number;
    product_id: number;
    prod_quantity: number;
    user_id: number;
    status_of_order: string;
}

export class OrderService {
    private async executeQuery(sql: string, params: any[] = []): Promise<any> {
        const conn = await client.connect();
        try {
            const result = await conn.query(sql, params);
            return result.rows;
        } finally {
            conn.release();
        }
    }

    async getAllOrders(): Promise<Order[]> {
        const sql = 'SELECT * FROM orders';
        return this.executeQuery(sql);
    }

    async getOrderById(id: string): Promise<Order> {
        const sql = 'SELECT * FROM orders WHERE id = $1';
        const result = await this.executeQuery(sql, [id]);
        if (result.length === 0) {
            throw new Error(`Order with id ${id} not found`);
        }
        return result[0];
    }

    async createOrder(order: Omit<Order, 'id'>): Promise<Order> {
        const sql =
            'INSERT INTO orders (product_id, prod_quantity, user_id, status_of_order) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await this.executeQuery(sql, [
            order.product_id,
            order.prod_quantity,
            order.user_id,
            order.status_of_order,
        ]);
        return result[0];
    }

    async updateOrderById(id: string, order: Order): Promise<Order> {
        const currentOrder = await this.getOrderById(id);
        const updatedOrder = { ...currentOrder, ...order };
        const sql =
            'UPDATE orders SET product_id = $1, prod_quantity = $2, user_id = $3, status_of_order = $4 WHERE id = $5 RETURNING *';
        const result = await this.executeQuery(sql, [
            updatedOrder.product_id,
            updatedOrder.prod_quantity,
            updatedOrder.user_id,
            updatedOrder.status_of_order,
            id,
        ]);
        return result[0];
    }

    async deleteOrderById(id: string): Promise<Order> {
        const sql = 'DELETE FROM orders WHERE id = $1 RETURNING *';
        const result = await this.executeQuery(sql, [id]);
        if (result.length === 0) {
            throw new Error(`Order with id ${id} not found`);
        }
        return result[0];
    }
}
