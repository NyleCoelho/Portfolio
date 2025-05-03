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