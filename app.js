//inicializa o EmailJS com minha chave pública
emailjs.init("lW5ms8qxD_Sdomn75"); 

//função para enviar o formulário
function enviarFormularioDeContato(evento) {
  evento.preventDefault(); // Evita o recarregamento

  //envia o e-mail usando os IDs do EmailJS
  emailjs.sendForm("gmail_portfolio_bianca", "template_huq2ijn", evento.target)
    .then(() => {
      evento.target.reset(); // Limpa o formulário
    })
    .catch((erro) => {
      alert("Erro ao enviar: " + erro.text);
    });
}

//adiciona o evento ao formulário
const formularioContato = document.querySelector(".contato__formulario");
if (formularioContato) {
  formularioContato.addEventListener("submit", enviarFormularioDeContato);
}

// unções para controlar os pop-ups
function mostrarPopupSucesso() {
    const popupSucesso = document.getElementById('sucessoPopup');
    popupSucesso.style.display = 'flex';

    //fecha automaticamente após 4 segundos
    setTimeout(() => {
      popupSucesso.style.display = 'none';
    }, 4000);
  }

  function mostrarPopupErro(erro) {
    const popupErro = document.getElementById('erroPopup');
    const mensagemElemento = popupErro.querySelector('.popup__mensagem');

    //mensagem de erro personalizada
    mensagemElemento.textContent = erro || 'Houve um problema ao enviar sua mensagem. Tente novamente.';
    popupErro.style.display = 'flex';
  }

  //fecha pop-ups ao clicar no botão ou fora do conteúdo
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

  //modifiCA o evento de submit do formulário
  document.querySelector('.contato__formulario').addEventListener('submit', function(evento) {
    evento.preventDefault();

    emailjs.sendForm("gmail_portfolio_bianca", "template_huq2ijn", this)
      .then(() => {
        mostrarPopupSucesso();
        this.reset(); //limpa o formulário
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
    //escreve ou apaga letra por letra
    if (!estaApagando && indiceLetra <= listaDePalavras[indicePalavra].length) {
      elementoPalavra.textContent = listaDePalavras[indicePalavra].slice(0, indiceLetra++);
    } else if (estaApagando && indiceLetra >= 0) {
      elementoPalavra.textContent = listaDePalavras[indicePalavra].slice(0, indiceLetra--);
    }
  
    //pausa antes de apagar
    if (indiceLetra === listaDePalavras[indicePalavra].length + 1) {
      estaApagando = true;
      setTimeout(escreverPalavra, 1000);
      return;
    }
  
    //troca para a próxima palavra após apagar tudo
    if (indiceLetra === 0 && estaApagando) {
      estaApagando = false;
      indicePalavra = (indicePalavra + 1) % listaDePalavras.length;
    }
  
    //velocidade da digitação e apagamento
    setTimeout(escreverPalavra, estaApagando ? 40 : 100);
  }
  
  escreverPalavra();
  
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('show');
      } else {
        entrada.target.classList.remove('show'); //remove classe se sair da tela
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
      return cardsProjetos[0].offsetWidth + espacamento; //calcula largura total do card + gap
    };
  
    let larguraCard = obterLarguraCard();
    let indiceAtual = 0;
    let estaAnimando = false;
  
    //clona os cards para efeito infinito
    const clonarCards = () => {
      const ehMobile = window.innerWidth <= 768;
      const quantidadeClones = ehMobile ? 1 : 3;
  
      //clona início e fim dos cards
      const primeirosClones = Array.from(cardsProjetos).slice(0, quantidadeClones).map(card => card.cloneNode(true));
      const ultimosClones = Array.from(cardsProjetos).slice(-quantidadeClones).map(card => card.cloneNode(true));
  
      primeirosClones.forEach(clone => carrosselProjetos.appendChild(clone));
      ultimosClones.reverse().forEach(clone => carrosselProjetos.prepend(clone));
  
      //atualiza a lista de cards e o índice inicial
      cardsProjetos = document.querySelectorAll('.projetos__card');
      indiceAtual = quantidadeClones;
    };
  
    clonarCards();
  
    const atualizarCarrossel = (instantaneo = false) => {
      //aplica ou remove transição conforme o caso
      if (instantaneo) {
        carrosselProjetos.style.transition = 'none';
      } else {
        carrosselProjetos.style.transition = 'transform 0.5s ease-in-out';
      }
  
      larguraCard = obterLarguraCard(); // recalcula dinamicamente
      carrosselProjetos.style.transform = `translateX(-${indiceAtual * larguraCard}px)`; // move carrossel
    };
  
    const verificarPosicao = () => {
      //reinicia posição se estiver nos clones
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
      //aguarda fim da animação antes de permitir novo clique
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
      larguraCard = obterLarguraCard(); //ajusta ao redimensionar
      atualizarCarrossel(true);
    });
  
    atualizarCarrossel(true);
  });
  
