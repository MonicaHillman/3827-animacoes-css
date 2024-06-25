import { removerProdutoDoLocalStorage } from "./removerProdutoDoLocalStorage.js"
// Função para carregar os itens da sacola do localStorage
export function carregarItensDaSacola() {
  const sacola = JSON.parse(localStorage.getItem("sacola")) || [];
  const listaSacola = document.getElementById("sacola");

  console.log(sacola)

  sacola.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "item-list";

    const itemContent = `
      <div class="item-list-product">
        <img src="${item.imagens.desktop}" class="preview" alt="${item.nome}">
        <div>
          <h4>${item.nome}</h4>
          <p>${item.descricao}</p>
        </div>
      </div>

      <p class="item-price">${item.preco}</p>

      <div class="item-number">
        <p>Quantidade</p>
        <button>
          <img src="assets/plus.svg" alt="adicionar">
        </button>

        <input type="text" value="1"></input>

        <button>
          <img src="assets/minus.svg" alt="remover">
        </button>
      </div>

      <button class="delete">
        <img src="assets/trash.svg" alt="excluir">
      </button>
    `;

    listItem.innerHTML = itemContent;
    listaSacola.appendChild(listItem);

    const deleteButton = listItem.querySelector(".delete");
    deleteButton.addEventListener("click", () => {

      listaSacola.removeChild(listItem); // Remove o item da lista visualmente
      removerProdutoDoLocalStorage(item.nome); // Remove o item do localStorage
      console.log(item.nome)
    });

  });
}
