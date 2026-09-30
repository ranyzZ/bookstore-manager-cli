import { rl } from '../utils/readline';
import { LivroService } from '../services/LivroService';

export class LivroController {
    private service = new LivroService();

    async menu(): Promise<void> {
        let sair = false;
        while (!sair) {
            console.log('\n===== GERENCIAR LIVROS =====');
            console.log('1 - Cadastrar livro');
            console.log('2 - Listar livros');
            console.log('3 - Consultar livro por ID');
            console.log('4 - Atualizar livro');
            console.log('5 - Remover livro');
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
        const titulo = await rl.question('Título: ');
        const autor_id = Number(await rl.question('ID do autor: '));
        const ano_publicacao = Number(await rl.question('Ano de publicação: '));
        const quantidade_disponivel = Number(await rl.question('Quantidade disponível: '));
        const livro = await this.service.cadastrar({ titulo, autor_id, ano_publicacao, quantidade_disponivel });
        console.log(`[OK] Livro "${livro.titulo}" cadastrado com ID ${livro.id}.`);
    }

    private async listar(): Promise<void> {
        const livros = await this.service.listar();
        if (livros.length === 0) {
            console.log('[AVISO] Nenhum livro cadastrado.');
            return;
        }
        console.log('\n--- Lista de Livros ---');
        livros.forEach(l => {
            console.log(`#${l.id} - ${l.titulo} (${l.ano_publicacao}) | Autor ID: ${l.autor_id} | Disponível: ${l.quantidade_disponivel}`);
        });
    }

    private async consultar(): Promise<void> {
        const id = Number(await rl.question('ID do livro: '));
        const livro = await this.service.buscarPorId(id);
        console.log(`#${livro.id} - ${livro.titulo} (${livro.ano_publicacao}) | Disponível: ${livro.quantidade_disponivel}`);
    }

    private async atualizar(): Promise<void> {
        const id = Number(await rl.question('ID do livro: '));
        const titulo = await rl.question('Novo título: ');
        const autor_id = Number(await rl.question('Novo ID do autor: '));
        const ano_publicacao = Number(await rl.question('Novo ano: '));
        const quantidade_disponivel = Number(await rl.question('Nova quantidade: '));
        const livro = await this.service.atualizar(id, { titulo, autor_id, ano_publicacao, quantidade_disponivel });
        console.log(`[OK] Livro "${livro.titulo}" atualizado.`);
    }

    private async remover(): Promise<void> {
        const id = Number(await rl.question('ID do livro: '));
        await this.service.remover(id);
        console.log('[OK] Livro removido com sucesso.');
    }
}