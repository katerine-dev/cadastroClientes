// Funções Auxiliares:
// Limpa campos de input 
// o opedador permite que a função receba vários argumentos de uma vez (vários inputs)
export function limparInputs(...inputs){
    inputs.forEach(inputs => inputs.value = "");
}

// Verifica se todos os campos estão preenchidos 
export function validarCampos(...inputs){
    return inputs.every(input => input.value.trim() !== ""); // Impede adicionar clientes vazios
}