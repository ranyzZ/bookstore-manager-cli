import { rl } from '../utils/readline';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {
    private service = new ClienteService();

    async menu(): Promise<void> {
        let sair = false;
        while (!sair) {
            console.log('\n===== GERENCIAR CLIENTES =====');
            console.log('1 - Cadastrar cliente');
            console.log('2 - Listar clientes');
            console.log('3 - Consultar cliente por ID');
            console.log('4 - Atualizar cliente');
            console.log('5 - Remover cliente');
            console.log('0 - Voltar');
            const opcao = await rl.question('Escolha uma opção: ');

            try {
                switch (opcao.trim()) {
                    case '1': await this.cadastrar(); break;
                    case '2': await this.listar(); break;
                    case '3': await this.consultar(); break;
                    case '4': await this.atualizar(); break;
                    case '5': await this.remover(); break;
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

    private async cadastrar(): Promise<void> {
        const nome = await rl.question('Nome: ');
        const email = await rl.question('E-mail: ');
        const telefone = await rl.question('Telefone: ');
        const cliente = await this.service.cadastrar({ nome, email, telefone });
        console.log(`[OK] Cliente "${cliente.nome}" cadastrado com ID ${cliente.id}.`);
    }

    private async listar(): Promise<void> {
        const clientes = await this.service.listar();
        if (clientes.length === 0) {
            console.log('[AVISO] Nenhum cliente cadastrado.');
            return;
        }
        console.log('\n--- Lista de Clientes ---');
        clientes.forEach(c => {
            console.log(`#${c.id} - ${c.nome} | ${c.email} | ${c.telefone}`);
        });
    }

    private async consultar(): Promise<void> {
        const id = Number(await rl.question('ID do cliente: '));
        const cliente = await this.service.buscarPorId(id);
        console.log(`#${cliente.id} - ${cliente.nome} | ${cliente.email} | ${cliente.telefone}`);
    }

    private async atualizar(): Promise<void> {
        const id = Number(await rl.question('ID do cliente: '));
        const nome = await rl.question('Novo nome: ');
        const email = await rl.question('Novo e-mail: ');
        const telefone = await rl.question('Novo telefone: ');
        const cliente = await this.service.atualizar(id, { nome, email, telefone });
        console.log(`[OK] Cliente "${cliente.nome}" atualizado.`);
    }

    private async remover(): Promise<void> {
        const id = Number(await rl.question('ID do cliente: '));
        await this.service.remover(id);
        console.log('[OK] Cliente removido com sucesso.');
    }
}