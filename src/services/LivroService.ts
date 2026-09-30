import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { Livro } from '../models/Livro';

export class LivroService {
    private repository = new LivroRepository();
    private autorRepository = new AutorRepository();

    async cadastrar(livro: Livro): Promise<Livro> {
        if (!livro.titulo || livro.titulo.trim().length < 2) {
            throw new Error('O título do livro deve ter pelo menos 2 caracteres.');
        }

        const autor = await this.autorRepository.buscarPorId(livro.autor_id);
        if (!autor) {
            throw new Error('Autor não encontrado. Cadastre o autor antes de cadastrar o livro.');
        }

        if (!livro.ano_publicacao || livro.ano_publicacao < 1000) {
            throw new Error('Ano de publicação inválido.');
        }

        if (livro.quantidade_disponivel < 0) {
            throw new Error('A quantidade disponível não pode ser negativa.');
        }

        return await this.repository.criar(livro);
    }

    async listar(): Promise<Livro[]> {
        return await this.repository.listar();
    }

    async buscarPorId(id: number): Promise<Livro> {
        const livro = await this.repository.buscarPorId(id);
        if (!livro) {
            throw new Error('Livro não encontrado.');
        }
        return livro;
    }

    async atualizar(id: number, livro: Livro): Promise<Livro> {
        await this.buscarPorId(id);

        const autor = await this.autorRepository.buscarPorId(livro.autor_id);
        if (!autor) {
            throw new Error('Autor não encontrado.');
        }

        if (!livro.titulo || livro.titulo.trim().length < 2) {
            throw new Error('O título do livro deve ter pelo menos 2 caracteres.');
        }

        const atualizado = await this.repository.atualizar(id, livro);
        if (!atualizado) {
            throw new Error('Erro ao atualizar livro.');
        }
        return atualizado;
    }

    async remover(id: number): Promise<void> {
        await this.buscarPorId(id);
        const removido = await this.repository.remover(id);
        if (!removido) {
            throw new Error('Erro ao remover livro.');
        }
    }
}