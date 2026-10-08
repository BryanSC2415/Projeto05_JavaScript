let animes = [
  {
    nome: "Frieren",
    imagem: "",
    motivoCena:
      "A cena em que a Frieren entende que deveria ter conhecido melhor o Himmel.",
    review: "Um anime calmo e bonito sobre o tempo e as pessoas que passam pela nossa vida.",
    recomendacao: "Porque é diferente de tudo e emociona sem precisar de muita ação.",
    autor: "Bryan",
  },
  {
    nome: "Fullmetal Alchemist: Brotherhood",
    imagem: "",
    motivoCena: "A luta do Roy Mustang contra a Lust.",
    review: "História completa, com começo, meio e fim muito bem feitos.",
    recomendacao: "É um dos melhores animes já feitos, ótimo para quem está começando.",
    autor: "Bryan",
  },
  {
    nome: "Attack on Titan",
    imagem: "",
    motivoCena: "A revelação do Titã Colossal e do Titã Encouraçado.",
    review: "Cheio de mistério e reviravoltas do começo ao fim.",
    recomendacao: "Se você gosta de ser surpreendido, esse anime é para você.",
    autor: "Bryan",
  },
];

let indiceEditando = -1;

const formulario = document.getElementById("formulario");
const tituloFormulario = document.getElementById("titulo-formulario");
const botaoSalvar = document.getElementById("botao-salvar");
const botaoCancelar = document.getElementById("botao-cancelar");
const listaAnimes = document.getElementById("lista-animes");

const campoNome = document.getElementById("nome");
const campoImagem = document.getElementById("imagem");
const campoMotivoCena = document.getElementById("motivoCena");
const campoReview = document.getElementById("review");
const campoRecomendacao = document.getElementById("recomendacao");
const campoAutor = document.getElementById("autor");

function mostrarAnimes() {
  listaAnimes.innerHTML = "";

  for (let i = 0; i < animes.length; i++) {
    const anime = animes[i];

    let imagemHtml = "<span class='text-slate-500'>Sem imagem</span>";
    if (anime.imagem !== "") {
      imagemHtml = `<img src="${anime.imagem}" alt="Cena de ${anime.nome}" class="w-40 rounded" />`;
    }

    listaAnimes.innerHTML += `
      <tr class="border-b border-slate-700">
        <td class="p-2 font-bold text-purple-300">${anime.nome}</td>
        <td class="p-2">${imagemHtml}</td>
        <td class="p-2">${anime.motivoCena}</td>
        <td class="p-2">${anime.review}</td>
        <td class="p-2">${anime.recomendacao}</td>
        <td class="p-2">${anime.autor}</td>
        <td class="p-2">
          <button onclick="editarAnime(${i})" class="bg-amber-500 text-black px-2 py-1 rounded mb-1">Editar</button>
          <button onclick="excluirAnime(${i})" class="bg-red-600 text-white px-2 py-1 rounded">Excluir</button>
        </td>
      </tr>
    `;
  }
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const link = campoImagem.value;
  if (link.includes("pinterest.com/pin") || link.includes("pin.it")) {
    alert('Esse é o link da página do pin. Clique com o botão direito na imagem e use "Copiar endereço da imagem".');
    return;
  }

  const novoAnime = {
    nome: campoNome.value,
    imagem: campoImagem.value,
    motivoCena: campoMotivoCena.value,
    review: campoReview.value,
    recomendacao: campoRecomendacao.value,
    autor: campoAutor.value,
  };

  if (indiceEditando === -1) {
    animes.push(novoAnime);
  } else {
    animes[indiceEditando] = novoAnime;
  }

  limparFormulario();
  mostrarAnimes();
});

function editarAnime(i) {
  const anime = animes[i];

  campoNome.value = anime.nome;
  campoImagem.value = anime.imagem;
  campoMotivoCena.value = anime.motivoCena;
  campoReview.value = anime.review;
  campoRecomendacao.value = anime.recomendacao;
  campoAutor.value = anime.autor;

  indiceEditando = i;
  tituloFormulario.textContent = "Editando: " + anime.nome;
  botaoSalvar.textContent = "Salvar alteração";
  botaoCancelar.classList.remove("hidden");

  window.scrollTo(0, 0);
}

function excluirAnime(i) {
  const confirmou = confirm("Tem certeza que quer excluir " + animes[i].nome + "?");

  if (confirmou) {
    animes.splice(i, 1);
    limparFormulario();
    mostrarAnimes();
  }
}

function limparFormulario() {
  formulario.reset();
  indiceEditando = -1;
  tituloFormulario.textContent = "Adicionar anime";
  botaoSalvar.textContent = "Adicionar";
  botaoCancelar.classList.add("hidden");
}

botaoCancelar.addEventListener("click", limparFormulario);

mostrarAnimes();
