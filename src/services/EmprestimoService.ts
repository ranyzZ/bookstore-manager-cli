import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoService {
    private repository = new EmprestimoRepository();
    private livroRepository = new LivroRepository();
    private clienteRepository = new ClienteRepository();

    async realizarEmprestimo(livro_id: number, cliente_id: number): Promise<Emprestimo> {
        const livro = await this.livroRepository.buscarPorId(livro_id);
        if (!livro) {
            throw new Error('Livro não encontrado.');
        }

        const cliente = await this.clienteRepository.buscarPorId(cliente_id);
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }

        if (livro.quantidade_disponivel <= 0) {
            throw new Error('Livro indisponível para empréstimo.');
        }

        const emprestimo: Emprestimo = {
            livro_id,
            cliente_id,
            data_emprestimo: new Date(),
            devolvido: false,
        };

        const novoEmprestimo = await this.repository.criar(emprestimo);

        await this.livroRepository.atualizar(livro_id, {
            ...livro,
            quantidade_disponivel: livro.quantidade_disponivel - 1,
        });

        return novoEmprestimo;
    }

    async listar(): Promise<Emprestimo[]> {
        return await this.repository.listar();
    }

    async buscarPorId(id: number): Promise<Emprestimo> {
        const emprestimo = await this.repository.buscarPorId(id);
        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado.');
        }
        return emprestimo;
    }

    async registrarDevolucao(id: number): Promise<Emprestimo> {
        const emprestimo = await this.buscarPorId(id);

        if (emprestimo.devolvido) {
            throw new Error('Este empréstimo já foi devolvido.');
        }

        const devolvido = await this.repository.registrarDevolucao(id);
        if (!devolvido) {
            throw new Error('Erro ao registrar devolução.');
        }

        const livro = await this.livroRepository.buscarPorId(emprestimo.livro_id);
        if (livro) {
            await this.livroRepository.atualizar(livro.id!, {
                ...livro,
                quantidade_disponivel: livro.quantidade_disponivel + 1,
            });
        }

        return devolvido;
    }
}