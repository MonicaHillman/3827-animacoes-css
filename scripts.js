
import { carregarItensDaSacola } from "./js/carregarItensDaSacola.js";
import { imprimirCamisetas } from "./js/imprimirCamisetas.js";
import { imprimirUmDeCadaCategoria } from "./js/imprimirUmDeCadaCategoria.js";


// Chama a função para carregar os itens da sacola ao carregar a página



// Função para verificar se a página atual é /camisetas.html
function isPaginaCamisetas() {
  return window.location.pathname.includes("/camisetas.html");
}

function isPaginaSacola() {
  return window.location.pathname.includes("/sacola.html");
}

if (isPaginaSacola()) {
  carregarItensDaSacola();
}

// Função para imprimir somente as camisetas
function separarCamisetas(produtos) {
  const camisetas = produtos.produtos.camisetas;

  // Verifica se a página atual é /camisetas.html
  if (isPaginaCamisetas()) {
    imprimirCamisetas(camisetas);
  }
}

fetch("./json/produtos.json")
  .then((response) => response.json())
  .then((produtosJSON) => {
    if (isPaginaCamisetas()) {
      separarCamisetas(produtosJSON);
    } else imprimirUmDeCadaCategoria(produtosJSON);
  })
  .catch((error) => console.error("Erro ao carregar o arquivo JSON:", error));


document.addEventListener("DOMContentLoaded", function () {
  const containerSelecionarPersonalizado = document.querySelector(".container-selecionar-personalizado");
  const opcaoSelecionada = document.querySelector(".opcao-selecionada");
  const containerOpcoes = containerSelecionarPersonalizado.querySelector(".container-opcoes");
  const opcoes = containerOpcoes.querySelectorAll(".opcao");

  const alternarOpcoes = () => {
    if (containerOpcoes.classList.contains("abrir")) {
      containerOpcoes.classList.remove("abrir");
      containerSelecionarPersonalizado.classList.remove("abrir")
    } else {
      containerOpcoes.classList.add("abrir");
      containerSelecionarPersonalizado.classList.add("abrir")
      containerOpcoes.style.height = containerOpcoes.scrollHeight + "px"
    }
  }

  opcaoSelecionada.addEventListener("click", alternarOpcoes);

  opcoes.forEach(opcao => {
    opcao.addEventListener("click", (evento) => {
      opcaoSelecionada.textContent = evento.target.textContent;
      opcaoSelecionada.dataset.value = evento.target.dataset.value;
      containerOpcoes.classList.remove("abrir");
      containerSelecionarPersonalizado.classList.remove("abrir");
      containerOpcoes.style.height = 0;
    })
  })
})