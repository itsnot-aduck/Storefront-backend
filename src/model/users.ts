import client from '../database';
import bcrypt from 'bcrypt';
import config from '../bcrypt';

export interface User {
    id?: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserService {
    private async executeQuery(sql: string, params: any[] = []): Promise<any> {
        const conn = await client.connect();
        try {
            const result = await conn.query(sql, params);
            return result.rows;
        } finally {
            conn.release();
        }
    }

    private hashPassword(password: string): string {
        return bcrypt.hashSync(`${password}${config.pepper}`, parseInt(config.salt as string, 10));
    }

    async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        const sql = 'SELECT id, email, firstname, lastname FROM users';
        return this.executeQuery(sql);
    }

    async updateUserById(updatedUser: User, id: string): Promise<Omit<User, 'password'>> {
        const sql = `  
      UPDATE users   
      SET email = $1, firstname = $2, lastname = $3, password = $4   
      WHERE id = $5   
      RETURNING id, email, firstname, lastname  
    `;
        const params = [
            updatedUser.email,
            updatedUser.firstname,
            updatedUser.lastname,
            this.hashPassword(updatedUser.password),
            id,
        ];
        const result = await this.executeQuery(sql, params);
        if (result.length === 0) {
            throw new Error(`User with id ${id} not found`);
        }
        return result[0];
    }

    async getUserById(id: string): Promise<Omit<User, 'password'>> {
        const sql = 'SELECT id, email, firstname, lastname FROM users WHERE id = $1';
        const result = await this.executeQuery(sql, [id]);
        if (result.length === 0) {
            throw new Error(`User with id ${id} not found`);
        }
        return result[0];
    }

    async createUser(user: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
        const sql = `  
      INSERT INTO users (email, firstname, lastname, password)   
      VALUES ($1, $2, $3, $4)   
      RETURNING id, email, firstname, lastname  
    `;
        const params = [user.email, user.firstname, user.lastname, this.hashPassword(user.password)];
        const result = await this.executeQuery(sql, params);
        return result[0];
    }

    async deleteUserById(id: string): Promise<Omit<User, 'password'>> {
        const sql = 'DELETE FROM users WHERE id = $1 RETURNING id, email, firstname, lastname';
        const result = await this.executeQuery(sql, [id]);
        if (result.length === 0) {
            throw new Error(`User with id ${id} not found`);
        }
        return result[0];
    }

    async authenticateUser(id: string, password: string): Promise<Omit<User, 'password'> | null> {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const result = await this.executeQuery(sql, [id]);
        if (result.length === 0) {
            return null;
        }
        const user = result[0];
        const passwordValid = bcrypt.compareSync(`${password}${config.pepper}`, user.password);
        if (!passwordValid) {
            return null;
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
