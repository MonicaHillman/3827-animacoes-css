import { adicionarProdutoAoLocalStorage } from "./adicionarProdutoAoLocalStorage.js";

function adicionarProduto(camiseta) {
  adicionarProdutoAoLocalStorage({
    nome: camiseta.nome,
    preco: camiseta.preco,
    descricao: camiseta.descricao,
    imagens: camiseta.imagens
  });
}

export function imprimirUmDeCadaCategoria(produtos) {
  const row = document.querySelector("#produtos");

  for (const categoria in produtos.produtos) {
    if (produtos.produtos.hasOwnProperty(categoria)) {
      const produto = produtos.produtos[categoria][0];

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-xxl-4 pb-4";
      row.appendChild(col);

      const card = document.createElement("div");
      card.className = "card";
      col.appendChild(card);

      const images = `
        <img class="d-block d-md-none" src="${produto.imagens.mobile}" alt="${produto.nome}">
        <img class="d-none d-md-block d-xl-none" src="${produto.imagens.tablet}" alt="${produto.nome}">
        <img class="d-none d-xl-block" src="${produto.imagens.desktop}" alt="${produto.nome}">
      `;

      const cardBody = `
        <div class="card-body">
          <h5 class="card-title fw-bold">${produto.nome}</h5>
          <p class="card-text">${produto.descricao}</p>
          <p class="fw-bold">${produto.preco}</p>
          <button type="button" class="btn btn-primary botao-lilas rounded-0 border-0" data-bs-toggle="modal" data-bs-target="#modal${categoria}">Ver mais</button>
        </div>
      `;

      const gerarHTMLCarrossel = (imagens, nome) => {
        if (typeof imagens !== "object" || Array.isArray(imagens)) {
          console.error("as imagens devem ser enviadas como um objeto")
          return ""
        }

        const urlsImagens = [imagens.mobile, imagens.tablet, imagens.desktop];

        return `
        <div id="carrossel${nome}" class="slideshow-container">
          ${urlsImagens.map((urlImagem, indice) => `
            <div class="meusSlides-${nome} fade">
            <img src=${urlImagem} alt="imagem ${indice}" style="width: 100%">
            </div>
          `)}
          <a class="anterior" id="anterior-${nome}">&#10094;</a>
          <a class="proxima" id="proxima-${nome}">&#10095;</a>
        </div>
        `
      }

      card.innerHTML = images + cardBody;
      card.className = "card card-animado"

      const carrossel = gerarHTMLCarrossel(produto.imagens, produto.nome.replace(/\s+/g, "-"))

      const modalContent = `
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-icon">
              <img src="assets/check-circle.svg">
              <h1 class="modal-title fs-5" id="modalLabel${categoria}">Confira detalhes sobre o produto</h1>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${carrossel}
            <div>
              <h3>${produto.nome}</h3>
              <p class="modal-description">${produto.descricao}</p>

              <hr class="divider-principal">

              <p class="modal-price">${produto.preco}</p>
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
              <label class="radio-container" for="tamanho-p">
                <input type="radio" name="tamanho-p" value="P" id="tamanho-p"/>
                <span class="checkmark"></span>
                <span class="radio-label">P</span>
              </label>

                   <label class="radio-container" for="tamanho-m">
                <input type="radio" name="tamanho-m" value="M" id="tamanho-m"/>
                <span class="checkmark"></span>
                <span class="radio-label">M</span>
              </label>

                   <label class="radio-container" for="tamanho-g">
                <input type="radio" name="tamanho-g" value="G" id="tamanho-g"/>
                <span class="checkmark"></span>
                <span class="radio-label">G</span>
              </label>
              </form>
            </div>
          </div>
    <div class="modal-footer">
            <button type="button" class="btn botao-lilas" id="adicionar-btn-${produto.nome.replace(/\s+/g, "-")}">Adicionar à sacola</button>
    <svg id="adicionar-favorito-${produto.nome.replace(/\s+/g, "-")}" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
            </div>
        </div>
      `;

      const modal = `
        <div class="modal fade" id="modal${categoria}" tabindex="-1" aria-labelledby="modalLabel${categoria}" aria-hidden="true">
          <div class="modal-dialog">
            ${modalContent}
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML("beforeend", modal);

      const botao = document.querySelector(`#adicionar-btn-${produto.nome.replace(/\s+/g, "-")}`);
      botao.addEventListener("click", () => adicionarProduto(produto));

      function trocarCoracao(coracao) {
        coracao.classList.toggle("animacao-coracao")
      }

      const favoritar = document.querySelector(`#adicionar-favorito-${produto.nome.replace(/\s+/g, "-")}`)
      favoritar.addEventListener("click", () => trocarCoracao(favoritar))

      let indiceSlide = 1;
      const mostrarSlides = (numero) => {
        const slides = document.querySelectorAll(`.meusSlides-${produto.nome.replace(/\s+/g, "-")}`)
        if (numero > slides.length) indiceSlide = 1;
        if (numero < 1) indiceSlide = slides.length
        slides.forEach(slide => slide.style.display = "none");
        slides[indiceSlide - 1].style.display = "block";
      }

      const maisSlides = (numero) => mostrarSlides(indiceSlide += numero);

      document.getElementById(`anterior-${produto.nome.replace(/\s+/g, "-")}`).onclick = () => {
        maisSlides(-1);
      }
      document.getElementById(`proxima-${produto.nome.replace(/\s+/g, "-")}`).onclick = () => {
        maisSlides(1);
      }

      mostrarSlides(indiceSlide);

    }

  }

  function elementoEstaNoViewport(elemento) {
    const retangulo = elemento.getBoundingClientRect();
    return (
      retangulo.top >= 0 &&
      retangulo.left >= 0 &&
      retangulo.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      retangulo.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }


  // Função para verificar se um elemento está dentro da seção dos cards
  function elementoEstaNaSecaoDosCards(elemento) {
    const secaoDosCards = document.getElementById('produtos'); // Identificador da seção dos cards
    const retanguloElemento = elemento.getBoundingClientRect();
    const retanguloSecao = secaoDosCards.getBoundingClientRect();
    return (
      retanguloElemento.top >= retanguloSecao.top &&
      retanguloElemento.bottom <= retanguloSecao.bottom
    );
  }

  function verificarVisibilidadeDosCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      if (elementoEstaNaSecaoDosCards(card) && elementoEstaNoViewport(card)) {
        card.classList.add("fade-in")
      }
    })
  }

  verificarVisibilidadeDosCards();
  window.addEventListener("scroll", verificarVisibilidadeDosCards)
}









