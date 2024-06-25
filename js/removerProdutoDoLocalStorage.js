export function removerProdutoDoLocalStorage(nomeProduto) {
    const sacola = JSON.parse(localStorage.getItem("sacola")) || [];

    // Procura pelo produto com o nome fornecido na sacola
    const novoSacola = sacola.filter(item => item.nome !== nomeProduto);

    // Atualiza a sacola no localStorage com a nova sacola
    localStorage.setItem("sacola", JSON.stringify(novoSacola));
}
