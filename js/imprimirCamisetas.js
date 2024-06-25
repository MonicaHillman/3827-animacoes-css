import { adicionarProdutoAoLocalStorage } from "./adicionarProdutoAoLocalStorage.js";


function adicionarProduto(camiseta) {
  adicionarProdutoAoLocalStorage({
    nome: camiseta.nome,
    preco: camiseta.preco,
    descricao: camiseta.descricao,
    imagens: camiseta.imagens
  });
}

// Função para imprimir todas camisetas
export function imprimirCamisetas(camisetas) {
  const row = document.querySelector("#produtos");

  camisetas.forEach((camiseta) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-xxl-4 pb-4";
    row.appendChild(col);

    const card = document.createElement("div");
    card.className = "card";
    col.appendChild(card);

    const images = `
      <img class="d-block d-md-none" src="${camiseta.imagens.mobile}" alt="${camiseta.nome}">
      <img class="d-none d-md-block d-xl-none" src="${camiseta.imagens.tablet}" alt="${camiseta.nome}">
      <img class="d-none d-xl-block" src="${camiseta.imagens.desktop}" alt="${camiseta.nome}">
    `;

    const cardBody = `
      <div class="card-body">
        <h5 class="card-title fw-bold">${camiseta.nome}</h5>
        <p class="card-text">${camiseta.descricao}</p>
        <p class="fw-bold">${camiseta.preco}</p>
        <button type="button" class="btn btn-primary botao-lilas rounded-0 border-0" data-bs-toggle="modal" data-bs-target="#modal${camiseta.nome.replace(
      /\s+/g,
      "-"
    )}">Ver mais</button>
      </div>
    `;

    card.innerHTML = images + cardBody;


    const modalContent = `
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-icon">
            <img src="assets/check-circle.svg">
            <h1 class="modal-title fs-5" id="modalLabel${camiseta.nome.replace(
      /\s+/g,
      "-"
    )}">Confira detalhes sobre o produto</h1>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img class="modal-imagem" src="${camiseta.imagens.desktop}" alt="${camiseta.nome
      }">
          <div>
            <h3>${camiseta.nome}</h3>
            <p class="modal-description">${camiseta.descricao}</p>

            <hr class="divider-principal">

            <p class="modal-price">${camiseta.preco}</p>
            <p class="modal-seller">Vendido e entregue por Riachuelo</p>

            <hr class="divider-secondary">
            <p><b>Cores</b></p>
            <form>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  Amarelo
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                <label class="form-check-label" for="flexRadioDefault2">
                  Offwhite
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                <label class="form-check-label" for="flexRadioDefault3">
                  Preto
                </label>
              </div>
            </form>

            <hr class="divider-secondary">

            <p><b>Tamanho</b></p>
            <form>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadio1">
                <label class="form-check-label" for="flexRadio1">
                  P
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadio2">
                <label class="form-check-label" for="flexRadio2">
                  M
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadio" id="flexRadio3">
                <label class="form-check-label" for="flexRadio3">
                  G
                </label>
              </div>
            </form>
          </div>
        </div>
<div class="modal-footer">

<button type="button" class="btn botao-lilas" id="adicionar-btn-${camiseta.nome.replace(/\s+/g, "-")}">Adicionar à sacola</button>
</div>



      </div>
    `;

    const modal = `
      <div class="modal fade" id="modal${camiseta.nome.replace(/\s+/g, "-")}">
        <div class="modal-dialog">
          ${modalContent}
        </div>
      </div>
    `;


    document.body.insertAdjacentHTML("beforeend", modal);

    // Agora, configure o evento de clique para o botão
    const botao = document.querySelector(`#adicionar-btn-${camiseta.nome.replace(/\s+/g, "-")}`);
    botao.addEventListener("click", () => adicionarProduto(camiseta));
  });
}
