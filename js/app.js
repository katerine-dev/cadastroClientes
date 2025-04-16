import { Cliente } from "./classes.js";
import { limparInputs, validarCampos } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const clientes = document.getElementById("listaClientes");
    const nomeInput = document.getElementById("cliente");
    const emailInput = document.getElementById("email");
    const addButton = document.getElementById("add");

    const API_URL = "https://crudcrud.com/api/4134e0454f8b4852b3e7b9aedb073f24/clientes";

    // Função para buscar e exibir Clientes salvos
    function carregarClientes() {
        fetch(API_URL)
            .then(resposta => resposta.json())
            .then(listaClientes => {
                clientes.innerHTML = ""; // Limpa a lista antes de renderizar
                listaClientes.map(({ nome, email, _id}) => new Cliente(nome, email, _id))
                    .forEach(cliente => {
                        const item = cliente.renderizar(deletarCliente);
                        clientes.appendChild(item);
                    });
            })
            .catch(erro => console.error("Erro ao buscar Cliente:", erro));
    }

    // Função para adicionar um cliente
    function adicionarCliente() {
        if(!validarCampos(nomeInput, emailInput)) return;

        const novoCliente = new Cliente(nomeInput.value, emailInput.value);

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ nome: novoCliente.nome, email: novoCliente.email })
        })
        .then(res => res.json())
        .then(clienteSalvo => {
            const cliente = new Cliente(clienteSalvo.nome, clienteSalvo.email, clienteSalvo._id);
            const item = cliente.renderizar(deletarCliente);
            clientes.appendChild(item);
            limparInputs(nomeInput, emailInput);
        })
        .catch(erro => console.error("Erro ao adicionar cliente: ", erro));
    }

    // Função para deletar cliente
    function deletarCliente(id, elemento) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => elemento.remove()) // Remove o item da lista ao excluir na API
            .catch(erro => console.error("Erro ao excluir cliente:", erro));
    }

    addButton.addEventListener("click", adicionarCliente);
    carregarClientes();
});