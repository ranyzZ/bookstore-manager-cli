import { rl } from '../utils/readline';
import { AutorController } from '../controllers/AutorController';
import { LivroController } from '../controllers/LivroController';
import { ClienteController } from '../controllers/ClienteController';
import { EmprestimoController } from '../controllers/EmprestimoController';

export class MainMenu {
    private autorController = new AutorController();
    private livroController = new LivroController();
    private clienteController = new ClienteController();
    private emprestimoController = new EmprestimoController();

    async iniciar(): Promise<void> {
        let sair = false;
        while (!sair) {
            console.log('\n========================================');
            console.log('     BOOKSTORE MANAGER CLI');
            console.log('========================================');
            console.log('1 - Gerenciar Autores');
            console.log('2 - Gerenciar Livros');
            console.log('3 - Gerenciar Clientes');
            console.log('4 - Gerenciar Empréstimos');
            console.log('5 - Relatórios');
            console.log('0 - Encerrar aplicação');
            console.log('========================================');
            const opcao = await rl.question('Escolha uma opção: ');

            switch (opcao.trim()) {
                case '1':
                    await this.autorController.menu();
                    break;
                case '2':
                    await this.livroController.menu();
                    break;
                case '3':
                    await this.clienteController.menu();
                    break;
                case '4':
                    await this.emprestimoController.menu();
                    break;
                case '5':
                    await this.relatorios();
                    break;
                case '0':
                    sair = true;
                    break;
                default:
                    console.log('[AVISO] Opção inválida.');
            }
        }

        rl.close();
        console.log('\nAté logo!');
    }

    private async relatorios(): Promise<void> {
        console.log('\n===== RELATÓRIOS =====');
        console.log('1 - Livros disponíveis');
        console.log('2 - Livros emprestados');
        console.log('3 - Quantidade de empréstimos por livro');
        console.log('4 - Clientes com empréstimos ativos');
        console.log('0 - Voltar');
        const opcao = await rl.question('Escolha uma opção: ');

        try {
            switch (opcao.trim()) {
                case '1':
                    await this.livrosDisponiveis();
                    break;
                case '2':
                    await this.livrosEmprestados();
                    break;
                case '3':
                    await this.quantidadeEmprestimosPorLivro();
                    break;
                case '4':
                    await this.clientesComEmprestimosAtivos();
                    break;
                case '0':
                    return;
                default:
                    console.log('[AVISO] Opção inválida.');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(`[ERRO] ${error.message}`);
            }
        }
    }

    private async livrosDisponiveis(): Promise<void> {
        const { pool } = await import('../database/connection');
        const result = await pool.query('SELECT id, titulo, quantidade_disponivel FROM livros WHERE quantidade_disponivel > 0 ORDER BY titulo');
        if (result.rows.length === 0) {
            console.log('[AVISO] Nenhum livro disponível.');
            return;
        }
        console.log('\n--- Livros Disponíveis ---');
        result.rows.forEach(l => {
            console.log(`#${l.id} - ${l.titulo} (${l.quantidade_disponivel} disponíveis)`);
        });
    }

    private async livrosEmprestados(): Promise<void> {
        const { pool } = await import('../database/connection');
        const query = `SELECT l.titulo, c.nome AS cliente, e.data_emprestimo
                       FROM emprestimos e
                       INNER JOIN livros l ON l.id = e.livro_id
                       INNER JOIN clientes c ON c.id = e.cliente_id
                       WHERE e.devolvido = FALSE
                       ORDER BY e.data_emprestimo`;
        const result = await pool.query(query);
        if (result.rows.length === 0) {
            console.log('[AVISO] Nenhum livro emprestado no momento.');
            return;
        }
        console.log('\n--- Livros Emprestados ---');
        result.rows.forEach(r => {
            console.log(`"${r.titulo}" - Cliente: ${r.cliente} | Data: ${r.data_emprestimo}`);
        });
    }

    private async quantidadeEmprestimosPorLivro(): Promise<void> {
        const { pool } = await import('../database/connection');
        const query = `SELECT l.titulo, COUNT(e.id) AS total
                       FROM livros l
                       LEFT JOIN emprestimos e ON e.livro_id = l.id
                       GROUP BY l.id, l.titulo
                       ORDER BY total DESC`;
        const result = await pool.query(query);
        console.log('\n--- Empréstimos por Livro ---');
        result.rows.forEach(r => {
            console.log(`"${r.titulo}" - ${r.total} empréstimo(s)`);
        });
    }

    private async clientesComEmprestimosAtivos(): Promise<void> {
        const { pool } = await import('../database/connection');
        const query = `SELECT c.nome, COUNT(e.id) AS total
                       FROM clientes c
                       INNER JOIN emprestimos e ON e.cliente_id = c.id
                       WHERE e.devolvido = FALSE
                       GROUP BY c.id, c.nome
                       ORDER BY total DESC`;
        const result = await pool.query(query);
        if (result.rows.length === 0) {
            console.log('[AVISO] Nenhum cliente com empréstimo ativo.');
            return;
        }
        console.log('\n--- Clientes com Empréstimos Ativos ---');
        result.rows.forEach(r => {
            console.log(`${r.nome} - ${r.total} empréstimo(s) ativo(s)`);
        });
    }
}