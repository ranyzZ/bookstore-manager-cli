import { testarConexao } from './database/connection';
import { MainMenu } from './menus/mainMenu';

async function main(): Promise<void> {
    try {
        console.log('Iniciando BookStore Manager CLI...');
        await testarConexao();
        const menu = new MainMenu();
        await menu.iniciar();
    } catch (error) {
        console.error('Erro ao iniciar aplicação:', error);
        process.exit(1);
    }
}

main();