import { rl } from '../utils/readline';
import { EmprestimoService } from '../services/EmprestimoService';

export class EmprestimoController {
    private service = new EmprestimoService();

    async menu(): Promise<void> {
        let sair = false;
        while (!sair) {
            console.log('\n===== GERENCIAR EMPRÉSTIMOS =====');
            console.log('1 - Realizar empréstimo');
            console.log('2 - Listar empréstimos');
            console.log('3 - Consultar empréstimo por ID');
            console.log('4 - Registrar devolução');
            console.log('0 - Voltar');
            const opcao = await rl.question('Escolha uma opção: ');

            try {
                switch (opcao.trim()) {
                    case '1': await this.realizar(); break;
                    case '2': await this.listar(); break;
                    case '3': await this.consultar(); break;
                    case '4': await this.devolver(); break;
                    case '0': sair = true; break;
                    default: console.log('[AVISO] Opção inválida.');
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(`[ERRO] ${error.message}`);
                }
            }
        }
    }

    private async realizar(): Promise<void> {
        const livro_id = Number(await rl.question('ID do livro: '));
        const cliente_id = Number(await rl.question('ID do cliente: '));
        const emp = await this.service.realizarEmprestimo(livro_id, cliente_id);
        console.log(`[OK] Empréstimo #${emp.id} realizado com sucesso.`);
    }

    private async listar(): Promise<void> {
        const emprestimos = await this.service.listar();
        if (emprestimos.length === 0) {
            console.log('[AVISO] Nenhum empréstimo registrado.');
            return;
        }
        console.log('\n--- Lista de Empréstimos ---');
        emprestimos.forEach(e => {
            const status = e.devolvido ? 'Devolvido' : 'Ativo';
            console.log(`#${e.id} | Livro: ${e.livro_id} | Cliente: ${e.cliente_id} | Data: ${e.data_emprestimo} | ${status}`);
        });
    }

    private async consultar(): Promise<void> {
        const id = Number(await rl.question('ID do empréstimo: '));
        const e = await this.service.buscarPorId(id);
        const status = e.devolvido ? 'Devolvido' : 'Ativo';
        console.log(`#${e.id} | Livro: ${e.livro_id} | Cliente: ${e.cliente_id} | Data: ${e.data_emprestimo} | ${status}`);
    }

    private async devolver(): Promise<void> {
        const id = Number(await rl.question('ID do empréstimo: '));
        await this.service.registrarDevolucao(id);
        console.log('[OK] Devolução registrada com sucesso.');
    }
}