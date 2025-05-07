// Inicializa o EmailJS com sua Public Key
emailjs.init("lW5ms8qxD_Sdomn75"); // Sua Public Key

// Função para enviar o formulário
function enviarFormulario(event) {
  event.preventDefault(); // Evita o recarregamento
  
  // Envia o e-mail usando os IDs do EmailJS
  emailjs.sendForm("gmail_portfolio_bianca", "template_huq2ijn", event.target)
    .then(() => {
      event.target.reset(); // Limpa o formulário
    })
    .catch((error) => {
      alert("Erro ao enviar: " + error.text);
    });
}

// Adiciona o evento ao formulário
const formulario = document.querySelector(".contact-form");
if (formulario) {
  formulario.addEventListener("submit", enviarFormulario);
}

// Funções para controlar os pop-ups
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    popup.style.display = 'flex';
    
    // Fecha automaticamente após 4 segundos
    setTimeout(() => {
      popup.style.display = 'none';
    }, 4000);
  }
  
  function showErrorPopup(error) {
    const popup = document.getElementById('errorPopup');
    const messageElement = popup.querySelector('.popup-message');
    
    // Mensagem de erro personalizada
    messageElement.textContent = error || 'Houve um problema ao enviar sua mensagem. Tente novamente.';
    popup.style.display = 'flex';
  }
  
  // Fechar pop-ups ao clicar no botão ou fora do conteúdo
  document.querySelectorAll('.popup-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.custom-popup').forEach(popup => {
        popup.style.display = 'none';
      });
    });
  });
  
  document.querySelectorAll('.custom-popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
  
  // Modifique o evento de submit do formulário
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    emailjs.sendForm("gmail_portfolio_bianca", "template_huq2ijn", this)
      .then(() => {
        showSuccessPopup();
        this.reset(); // Limpa o formulário
      })
      .catch((error) => {
        showErrorPopup(error.text);
      });
  });

  const palavras = ["cinéfila de sofá", "jogadora casual", "leitora ávida de romance criminal", "desenhista nas horas vagas", "tradutora de miados profissional"];
let i = 0;
let j = 0;
let apagando = false;
const span = document.getElementById("palavra");

function digita() {
  if (!apagando && j <= palavras[i].length) {
    span.textContent = palavras[i].slice(0, j++);
  } else if (apagando && j >= 0) {
    span.textContent = palavras[i].slice(0, j--);
  }

  if (j === palavras[i].length + 1) {
    apagando = true;
    setTimeout(digita, 1000);
    return;
  }

  if (j === 0 && apagando) {
    apagando = false;
    i = (i + 1) % palavras.length;
  }

  setTimeout(digita, apagando ? 40 : 100);
}

digita();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // opcional: remove classe se sair da tela
    }
  });
});

const aboutTitulo = document.querySelector('.about-titulo');
if (aboutTitulo) {
  observer.observe(aboutTitulo);
}

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.projects-grid');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');
  const cards = document.querySelectorAll('.project-card');
  
  // Calcula a largura de um card incluindo o gap
  const cardStyle = getComputedStyle(cards[0]);
  const gap = parseInt(getComputedStyle(carousel).gap.replace('px', ''));
  const cardWidth = cards[0].offsetWidth + gap;
  
  // Clona os cards para criar o efeito infinito
  const cloneCards = () => {
      // Clona os primeiros cards e adiciona no final
      const firstCards = Array.from(cards).slice(0, 3).map(card => card.cloneNode(true));
      firstCards.forEach(clone => carousel.appendChild(clone));
      
      // Clona os últimos cards e adiciona no início
      const lastCards = Array.from(cards).slice(-3).map(card => card.cloneNode(true));
      lastCards.reverse().forEach(clone => carousel.prepend(clone));
  };
  
  cloneCards();
  
  let currentIndex = 3; // Começa nos cards originais (ignorando os clones iniciais)
  let isAnimating = false;
  const totalCards = cards.length;

  // Atualiza a posição do carrossel
  const updateCarousel = (instant = false) => {
      if (instant) {
          carousel.style.transition = 'none';
      } else {
          carousel.style.transition = 'transform 0.5s ease-in-out';
      }
      
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  };

  // Verifica se precisa reposicionar o carrossel
  const checkPosition = () => {
      // Se chegou nos clones finais, volta para os originais
      if (currentIndex >= totalCards + 3) {
          currentIndex = 3;
          updateCarousel(true);
      }
      // Se chegou nos clones iniciais, vai para os originais no final
      else if (currentIndex < 3) {
          currentIndex = totalCards + 2;
          updateCarousel(true);
      }
  };

  // Avança para o próximo card
  nextBtn.addEventListener('click', () => {
      if (isAnimating) return;
      
      isAnimating = true;
      currentIndex++;
      updateCarousel();
      
      carousel.addEventListener('transitionend', () => {
          isAnimating = false;
          checkPosition();
      }, { once: true });
  });

  // Volta para o card anterior
  prevBtn.addEventListener('click', () => {
      if (isAnimating) return;
      
      isAnimating = true;
      currentIndex--;
      updateCarousel();
      
      carousel.addEventListener('transitionend', () => {
          isAnimating = false;
          checkPosition();
      }, { once: true });
  });

  // Inicializa o carrossel
  updateCarousel(true);
});