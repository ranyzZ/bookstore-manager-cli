import { rl } from '../utils/readline';
import { AutorService } from '../services/AutorService';

export class AutorController {
    private service = new AutorService();

    async menu(): Promise<void> {
        let sair = false;
        while (!sair) {
            console.log('\n===== GERENCIAR AUTORES =====');
            console.log('1 - Cadastrar autor');
            console.log('2 - Listar autores');
            console.log('3 - Consultar autor por ID');
            console.log('4 - Atualizar autor');
            console.log('5 - Remover autor');
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
        const nome = await rl.question('Nome do autor: ');
        const nacionalidade = await rl.question('Nacionalidade: ');
        const autor = await this.service.cadastrar({ nome, nacionalidade });
        console.log(`[OK] Autor "${autor.nome}" cadastrado com ID ${autor.id}.`);
    }

    private async listar(): Promise<void> {
        const autores = await this.service.listar();
        if (autores.length === 0) {
            console.log('[AVISO] Nenhum autor cadastrado.');
            return;
        }
        console.log('\n--- Lista de Autores ---');
        autores.forEach(a => {
            console.log(`#${a.id} - ${a.nome} (${a.nacionalidade})`);
        });
    }

    private async consultar(): Promise<void> {
        const id = Number(await rl.question('ID do autor: '));
        const autor = await this.service.buscarPorId(id);
        console.log(`#${autor.id} - ${autor.nome} (${autor.nacionalidade})`);
    }

    private async atualizar(): Promise<void> {
        const id = Number(await rl.question('ID do autor: '));
        const nome = await rl.question('Novo nome: ');
        const nacionalidade = await rl.question('Nova nacionalidade: ');
        const autor = await this.service.atualizar(id, { nome, nacionalidade });
        console.log(`[OK] Autor "${autor.nome}" atualizado.`);
    }

    private async remover(): Promise<void> {
        const id = Number(await rl.question('ID do autor: '));
        await this.service.remover(id);
        console.log('[OK] Autor removido com sucesso.');
    }
}