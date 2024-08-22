import client from '../database';
import bcrypt from 'bcrypt';

interface User {
    id: number;
    userName: string;
    password: string;
}

export class users {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`unable get users: ${err}`);
        }
    }

    // Show (token required)
    async show(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT id from users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`unable to get users: ${err}`);
        }
    }

    // Create
    async create(user: User): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (id, userName, password) VALUES ($1, $2, $3) RETURNING *';
            // Hash password
            const hashPassword = bcrypt.hashSync(
                user.password + process.env.PEPPER,
                parseInt(process.env.SALT_ROUNDS as string)
            );
            const result = await conn.query(sql, [user.id, user.userName, hashPassword]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`unable to create user: ${err}`);
        }
    }

    // Authentication
    async authenticate(userName: string, password: string): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE userName=($1)';
            const result = await conn.query(sql, [userName]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password + process.env.PEPPER, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`unable to authenticate user: ${err}`);
        }
    }
}
