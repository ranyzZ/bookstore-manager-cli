import { AutorRepository } from '../repositories/AutorRepository';
import { Autor } from '../models/Autor';

export class AutorService {
    private repository = new AutorRepository();

    async cadastrar(autor: Autor): Promise<Autor> {
        if (!autor.nome || autor.nome.trim().length < 3) {
            throw new Error('O nome do autor deve ter pelo menos 3 caracteres.');
        }
        if (!autor.nacionalidade) {
            throw new Error('A nacionalidade é obrigatória.');
        }
        return await this.repository.criar(autor);
    }

    async listar(): Promise<Autor[]> {
        return await this.repository.listar();
    }

    async buscarPorId(id: number): Promise<Autor> {
        const autor = await this.repository.buscarPorId(id);
        if (!autor) {
            throw new Error('Autor não encontrado.');
        }
        return autor;
    }

    async atualizar(id: number, autor: Autor): Promise<Autor> {
        await this.buscarPorId(id);
        
        if (!autor.nome || autor.nome.trim().length < 3) {
            throw new Error('O nome do autor deve ter pelo menos 3 caracteres.');
        }
        if (!autor.nacionalidade) {
            throw new Error('A nacionalidade é obrigatória.');
        }
        
        const atualizado = await this.repository.atualizar(id, autor);
        if (!atualizado) {
            throw new Error('Erro ao atualizar autor.');
        }
        return atualizado;
    }

    async remover(id: number): Promise<void> {
        await this.buscarPorId(id);
        const removido = await this.repository.remover(id);
        if (!removido) {
            throw new Error('Erro ao remover autor.');
        }
    }
}