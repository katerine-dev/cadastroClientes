export class Cliente {
    constructor(nome, email, id = null){
        this.nome = nome;
        this.email = email;
        this.id = id;
    }

    renderizar(callbackDeletar){
        const item = document.createElement("li");
        item.innerHTML = `${this.nome} <span class="email">(${this.email})</span> <button data-id="${this.id}">X</button>`;

        item.querySelector("button").addEventListener("click", () => {
            callbackDeletar(this.id, item);
        });

        return item;
    }
}