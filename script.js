document.addEventListener("DOMContentLoaded", () => {
    const clientes = document.getElementById("listaClientes");
    const API_URL = "https://crudcrud.com/api/0e714472b5634c26be24e8b30f6aff39/clientes";

    // Função para buscar e exibir Clientes salvos
    function carregarClientes() {
        fetch(API_URL)
            .then(resposta => resposta.json())
            .then(listaClientes => {
                clientes.innerHTML = ""; // Limpa a lista antes de renderizar
                listaClientes.forEach(cliente => adicionarClienteNaTela(cliente));
            })
            .catch(erro => console.error("Erro ao buscar Cliente:", erro));
    }

    // Função para adicionar um cliente na tela
    function adicionarClienteNaTela(cliente) {
        const item = document.createElement("li");
        item.innerHTML = `${cliente.nome} <button data-id="${cliente._id}">X</button>`;

        // Adiciona evento de exclusão ao botão
        item.querySelector("button").addEventListener("click", () => deletarCliente(cliente._id, item));

        clientes.appendChild(item);
    }

    // Função para adicionar cliente na API
    document.getElementById("add").addEventListener("click", () => {
        const nome = document.getElementById("cliente").value;

        if (!nome.trim()) return; // Impede adicionar clientes vazios

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nome })
        })
        .then(resposta => resposta.json())
        .then(novoCliente => {
            adicionarClienteNaTela(novoCliente);
            document.getElementById("cliente").value = ""; // Limpa o input
        })
        .catch(erro => console.error("Erro ao adicionar cliente:", erro));
    });

    // Função para deletar cliente da API e da tela
    function deletarCliente(id, elemento) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then(() => elemento.remove()) // Remove o item da lista ao excluir na API
            .catch(erro => console.error("Erro ao excluir cliente:", erro));
    }

    // Carregar cliente ao iniciar a página
    carregarClientes();
});