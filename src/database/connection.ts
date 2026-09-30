import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export async function testarConexao(): Promise<void> {
    try {
        const client = await pool.connect();
        console.log('Conectado ao PostgreSQL com sucesso!');
        client.release();
    } catch (error) {
        console.error('Erro ao conectar no PostgreSQL:', error);
        throw error;
    }
}