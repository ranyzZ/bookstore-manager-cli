import { ClienteRepository } from '../repositories/ClienteRepository';
import { Cliente } from '../models/Cliente';

export class ClienteService {
    private repository = new ClienteRepository();

    async cadastrar(cliente: Cliente): Promise<Cliente> {
        if (!cliente.nome || cliente.nome.trim().length < 3) {
            throw new Error('O nome do cliente deve ter pelo menos 3 caracteres.');
        }

        if (!cliente.email || !cliente.email.includes('@')) {
            throw new Error('E-mail inválido.');
        }

        if (!cliente.telefone || cliente.telefone.trim().length < 8) {
            throw new Error('Telefone inválido.');
        }

        return await this.repository.criar(cliente);
    }

    async listar(): Promise<Cliente[]> {
        return await this.repository.listar();
    }

    async buscarPorId(id: number): Promise<Cliente> {
        const cliente = await this.repository.buscarPorId(id);
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }
        return cliente;
    }

    async atualizar(id: number, cliente: Cliente): Promise<Cliente> {
        await this.buscarPorId(id);

        if (!cliente.nome || cliente.nome.trim().length < 3) {
            throw new Error('O nome do cliente deve ter pelo menos 3 caracteres.');
        }

        if (!cliente.email || !cliente.email.includes('@')) {
            throw new Error('E-mail inválido.');
        }

        const atualizado = await this.repository.atualizar(id, cliente);
        if (!atualizado) {
            throw new Error('Erro ao atualizar cliente.');
        }
        return atualizado;
    }

    async remover(id: number): Promise<void> {
        await this.buscarPorId(id);
        const removido = await this.repository.remover(id);
        if (!removido) {
            throw new Error('Erro ao remover cliente.');
        }
    }
}