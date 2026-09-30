import { pool } from '../database/connection';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoRepository {
    async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
        const query = `INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo, devolvido) 
                       VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(query, [
            emprestimo.livro_id,
            emprestimo.cliente_id,
            emprestimo.data_emprestimo,
            emprestimo.devolvido,
        ]);
        return result.rows[0];
    }

    async listar(): Promise<Emprestimo[]> {
        const result = await pool.query('SELECT * FROM emprestimos ORDER BY id');
        return result.rows;
    }

    async buscarPorId(id: number): Promise<Emprestimo | null> {
        const result = await pool.query('SELECT * FROM emprestimos WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async registrarDevolucao(id: number): Promise<Emprestimo | null> {
        const query = `UPDATE emprestimos SET data_devolucao = CURRENT_DATE, devolvido = TRUE 
                       WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }
}