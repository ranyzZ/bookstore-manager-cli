import { pool } from '../database/connection';
import { Livro } from '../models/Livro';

export class LivroRepository {
    async criar(livro: Livro): Promise<Livro> {
        const query = `INSERT INTO livros (titulo, autor_id, ano_publicacao, quantidade_disponivel) 
                       VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(query, [
            livro.titulo,
            livro.autor_id,
            livro.ano_publicacao,
            livro.quantidade_disponivel,
        ]);
        return result.rows[0];
    }

    async listar(): Promise<Livro[]> {
        const result = await pool.query('SELECT * FROM livros ORDER BY id');
        return result.rows;
    }

    async buscarPorId(id: number): Promise<Livro | null> {
        const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async atualizar(id: number, livro: Livro): Promise<Livro | null> {
        const query = `UPDATE livros SET titulo = $1, autor_id = $2, ano_publicacao = $3, 
                       quantidade_disponivel = $4 WHERE id = $5 RETURNING *`;
        const result = await pool.query(query, [
            livro.titulo,
            livro.autor_id,
            livro.ano_publicacao,
            livro.quantidade_disponivel,
            id,
        ]);
        return result.rows[0] || null;
    }

    async remover(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM livros WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}