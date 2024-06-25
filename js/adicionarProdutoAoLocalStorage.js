// Função para adicionar o produto ao localStorage
export function adicionarProdutoAoLocalStorage(produto) {

    console.log(JSON.stringify(produto))
  // Verifica se já existe algum produto na sacola
  let sacola = JSON.parse(localStorage.getItem('sacola')) || [];
  
  // Adiciona o produto à sacola
  sacola.push(produto);

  // Atualiza o localStorage com a nova sacola
  localStorage.setItem('sacola', JSON.stringify(sacola));
  
}
