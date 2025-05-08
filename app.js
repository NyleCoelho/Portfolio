// Inicializa o EmailJS com sua Chave Pública
emailjs.init("lW5ms8qxD_Sdomn75"); // Sua Chave Pública

// Função para enviar o formulário
function enviarFormularioDeContato(evento) {
  evento.preventDefault(); // Evita o recarregamento

  // Envia o e-mail usando os IDs do EmailJS
  emailjs.sendForm("gmail_portfolio_bianca", "template_huq2ijn", evento.target)
    .then(() => {
      evento.target.reset(); // Limpa o formulário
    })
    .catch((erro) => {
      alert("Erro ao enviar: " + erro.text);
    });
}

// Adiciona o evento ao formulário
const formularioContato = document.querySelector(".contato__formulario");
if (formularioContato) {
  formularioContato.addEventListener("submit", enviarFormularioDeContato);
}

// Funções para controlar os pop-ups
function mostrarPopupSucesso() {
    const popupSucesso = document.getElementById('sucessoPopup');
    popupSucesso.style.display = 'flex';

    // Fecha automaticamente após 4 segundos
    setTimeout(() => {
      popupSucesso.style.display = 'none';
    }, 4000);
  }

  function mostrarPopupErro(erro) {
    const popupErro = document.getElementById('erroPopup');
    const mensagemElemento = popupErro.querySelector('.popup__mensagem');

    // Mensagem de erro personalizada
    mensagemElemento.textContent = erro || 'Houve um problema ao enviar sua mensagem. Tente novamente.';
    popupErro.style.display = 'flex';
  }

  // Fechar pop-ups ao clicar no botão ou fora do conteúdo
  document.querySelectorAll('.popup__botaofechar').forEach(botao => {
    botao.addEventListener('click', () => {
      document.querySelectorAll('.erroPopup').forEach(popup => {
        popup.style.display = 'none';
      });
    });
  });

  document.querySelectorAll('.contato-popup').forEach(popup => {
    popup.addEventListener('click', (evento) => {
      if (evento.target === popup) {
        popup.style.display = 'none';
      }
    });
  });

  // Modifique o evento de submit do formulário
  document.querySelector('.contato__formulario').addEventListener('submit', function(evento) {
    evento.preventDefault();

    emailjs.sendForm("gmail_portfolio_bianca", "template_huq2ijn", this)
      .then(() => {
        mostrarPopupSucesso();
        this.reset(); // Limpa o formulário
      })
      .catch((erro) => {
        mostrarPopupErro(erro.text);
      });
  });

  const listaDePalavras = ["cinéfila de sofá", "jogadora casual", "leitora ávida de romance criminal", "desenhista nas horas vagas", "tradutora de miados profissional"];
let indicePalavra = 0;
let indiceLetra = 0;
let estaApagando = false;
const elementoPalavra = document.getElementById("palavra");

function escreverPalavra() {
  if (!estaApagando && indiceLetra <= listaDePalavras[indicePalavra].length) {
    elementoPalavra.textContent = listaDePalavras[indicePalavra].slice(0, indiceLetra++);
  } else if (estaApagando && indiceLetra >= 0) {
    elementoPalavra.textContent = listaDePalavras[indicePalavra].slice(0, indiceLetra--);
  }

  if (indiceLetra === listaDePalavras[indicePalavra].length + 1) {
    estaApagando = true;
    setTimeout(escreverPalavra, 1000);
    return;
  }

  if (indiceLetra === 0 && estaApagando) {
    estaApagando = false;
    indicePalavra = (indicePalavra + 1) % listaDePalavras.length;
  }

  setTimeout(escreverPalavra, estaApagando ? 40 : 100);
}

escreverPalavra();

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('show');
    } else {
      entrada.target.classList.remove('show'); // opcional: remove classe se sair da tela
    }
  });
});

const tituloSobreMim = document.querySelector('.sobremim__titulo');
if (tituloSobreMim) {
  observador.observe(tituloSobreMim);
}


document.addEventListener('DOMContentLoaded', () => {
  const carrosselProjetos = document.querySelector('.projetos__grid');
  const botaoAnterior = document.querySelector('.botao-carrossel.prev');
  const botaoProximo = document.querySelector('.botao-carrossel.next');
  let cardsProjetos = document.querySelectorAll('.projetos__card');

  const obterLarguraCard = () => {
    const espacamento = parseInt(getComputedStyle(carrosselProjetos).gap.replace('px', '')) || 0;
    return cardsProjetos[0].offsetWidth + espacamento;
  };

  let larguraCard = obterLarguraCard();
  let indiceAtual = 0;
  let estaAnimando = false;

  // Clona os cards para efeito infinito
  const clonarCards = () => {
    const ehMobile = window.innerWidth <= 768;
    const quantidadeClones = ehMobile ? 1 : 3;

    const primeirosClones = Array.from(cardsProjetos).slice(0, quantidadeClones).map(card => card.cloneNode(true));
    const ultimosClones = Array.from(cardsProjetos).slice(-quantidadeClones).map(card => card.cloneNode(true));

    primeirosClones.forEach(clone => carrosselProjetos.appendChild(clone));
    ultimosClones.reverse().forEach(clone => carrosselProjetos.prepend(clone));

    // Atualiza a lista de cards e o índice inicial
    cardsProjetos = document.querySelectorAll('.projetos__card');
    indiceAtual = quantidadeClones;
  };

  clonarCards();

  const atualizarCarrossel = (instantaneo = false) => {
    if (instantaneo) {
      carrosselProjetos.style.transition = 'none';
    } else {
      carrosselProjetos.style.transition = 'transform 0.5s ease-in-out';
    }

    larguraCard = obterLarguraCard(); // Recalcula dinamicamente
    carrosselProjetos.style.transform = `translateX(-${indiceAtual * larguraCard}px)`;
  };

  const verificarPosicao = () => {
    const quantidadeClones = window.innerWidth <= 768 ? 1 : 3;
    const totalCardsOriginais = cardsProjetos.length - (quantidadeClones * 2);

    if (indiceAtual >= totalCardsOriginais + quantidadeClones) {
      indiceAtual = quantidadeClones;
      atualizarCarrossel(true);
    } else if (indiceAtual < quantidadeClones) {
      indiceAtual = totalCardsOriginais + quantidadeClones - 1;
      atualizarCarrossel(true);
    }
  };

  botaoProximo.addEventListener('click', () => {
    if (estaAnimando) return;
    estaAnimando = true;
    indiceAtual++;
    atualizarCarrossel();
    carrosselProjetos.addEventListener('transitionend', () => {
      estaAnimando = false;
      verificarPosicao();
    }, { once: true });
  });

  botaoAnterior.addEventListener('click', () => {
    if (estaAnimando) return;
    estaAnimando = true;
    indiceAtual--;
    atualizarCarrossel();
    carrosselProjetos.addEventListener('transitionend', () => {
      estaAnimando = false;
      verificarPosicao();
    }, { once: true });
  });

  window.addEventListener('resize', () => {
    larguraCard = obterLarguraCard();
    atualizarCarrossel(true);
  });

  atualizarCarrossel(true);
});
