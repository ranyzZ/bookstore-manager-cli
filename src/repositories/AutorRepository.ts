import { pool } from '../database/connection';
import { Autor } from '../models/Autor';

export class AutorRepository {
    async criar(autor: Autor): Promise<Autor> {
        const query = 'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *';
        const result = await pool.query(query, [autor.nome, autor.nacionalidade]);
        return result.rows[0];
    }

    async listar(): Promise<Autor[]> {
        const result = await pool.query('SELECT * FROM autores ORDER BY id');
        return result.rows;
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        const result = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async atualizar(id: number, autor: Autor): Promise<Autor | null> {
        const query = 'UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(query, [autor.nome, autor.nacionalidade, id]);
        return result.rows[0] || null;
    }

    async remover(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM autores WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}