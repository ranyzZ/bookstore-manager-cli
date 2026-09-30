import { pool } from '../database/connection';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
    async criar(cliente: Cliente): Promise<Cliente> {
        const query = 'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *';
        const result = await pool.query(query, [cliente.nome, cliente.email, cliente.telefone]);
        return result.rows[0];
    }

    async listar(): Promise<Cliente[]> {
        const result = await pool.query('SELECT * FROM clientes ORDER BY id');
        return result.rows;
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async atualizar(id: number, cliente: Cliente): Promise<Cliente | null> {
        const query = 'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *';
        const result = await pool.query(query, [cliente.nome, cliente.email, cliente.telefone, id]);
        return result.rows[0] || null;
    }

    async remover(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}