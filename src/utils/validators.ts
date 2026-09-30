export function validarId(id: string): number {
    const numero = Number(id);
    if (isNaN(numero) || numero <= 0) {
        throw new Error('ID inválido. Digite um número maior que zero.');
    }
    return numero;
}

export function validarTexto(texto: string, campo: string, min: number = 1): string {
    const valor = texto.trim();
    if (valor.length < min) {
        throw new Error(`${campo} deve ter pelo menos ${min} caracteres.`);
    }
    return valor;
}