/* ============================================================
   CONFIGURAÇÕES — altere aqui a senha e a data do namoro
   ============================================================ */

// ALTERE AQUI A SENHA CORRETA (deixe tudo em minúsculo, sem espaços)
const SENHA_CORRETA = "euamomeunamorado";

// ALTERE AQUI A DATA EM QUE VOCÊS COMEÇARAM A NAMORAR
// Formato: ano, mês (1 a 12), dia, hora, minuto
const DATA_INICIO_NAMORO = new Date(2025, 2, 25, 0, 0, 0); // 25/03/2025 (mês 2 = março, pois janeiro é 0)

/* ============================================================
   ELEMENTOS DA TELA 1 — DESAFIO DA SENHA
   ============================================================ */
const telaSenha = document.getElementById("tela-senha");
const telaSurpresa = document.getElementById("tela-surpresa");
const elementoSenhaEmbaralhada = document.getElementById("senha-embaralhada");
const formSenha = document.getElementById("form-senha");
const inputSenha = document.getElementById("input-senha");
const mensagemErro = document.getElementById("mensagem-erro");
const botaoEntrar = document.getElementById("botao-entrar");

/**
 * Embaralha as letras de uma palavra, garantindo que o resultado
 * fique visualmente diferente da palavra original.
 */
function embaralharPalavra(palavra) {
  let letras = palavra.split("");
  let embaralhada = palavra;

  // repete o embaralhamento até o resultado ficar diferente do original
  let tentativas = 0;
  while (embaralhada === palavra && tentativas < 20) {
    for (let i = letras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    embaralhada = letras.join("");
    tentativas++;
  }
  return embaralhada;
}

// Mostra a senha embaralhada assim que a página carrega
elementoSenhaEmbaralhada.textContent = embaralharPalavra(SENHA_CORRETA);

// Pequenas mensagens carinhosas de erro (aparece uma aleatória a cada tentativa errada)
const MENSAGENS_ERRO = [
  "Hmm... tenta de novo, amor ❤️",
  "Quase! Olha as letras com calma 💕",
  "Ainda não é isso, mas eu acredito em você ✨",
  "Não desiste não, você consegue! 💗",
];

formSenha.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const resposta = inputSenha.value.trim().toLowerCase().replace(/\s+/g, "");

  if (resposta === SENHA_CORRETA) {
    // Acertou!
    mensagemErro.textContent = "";
    inputSenha.disabled = true;
    formSenha.querySelector("button").disabled = true;
    telaSenha.classList.add("acertou");

    criarExplosaoDeCoracoes();

    botaoEntrar.classList.remove("escondido");
    botaoEntrar.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    // Errou
    const mensagemAleatoria = MENSAGENS_ERRO[Math.floor(Math.random() * MENSAGENS_ERRO.length)];
    mensagemErro.textContent = mensagemAleatoria;
    inputSenha.focus();
    inputSenha.select();
  }
});

// Botão que leva para a tela da surpresa
botaoEntrar.addEventListener("click", function () {
  telaSenha.classList.remove("ativa");
  telaSurpresa.classList.add("ativa");

  // força o navegador a aplicar a animação de entrada
  requestAnimationFrame(() => {
    telaSurpresa.classList.add("mostrando");
    telaSurpresa.style.opacity = 1;
  });

  criarConfetes();
  window.scrollTo({ top: 0, behavior: "instant" });
});

/* ============================================================
   CORAÇÕES FLUTUANTES DE FUNDO (nas duas telas)
   ============================================================ */
function gerarCoracoesFundo(idContainer, quantidade) {
  const container = document.getElementById(idContainer);
  if (!container) return;

  const simbolosCoracao = ["❤️", "💗", "💕", "💖"];

  for (let i = 0; i < quantidade; i++) {
    const coracao = document.createElement("span");
    coracao.className = "coracao-flutuante";
    coracao.textContent = simbolosCoracao[Math.floor(Math.random() * simbolosCoracao.length)];

    const posicaoEsquerda = Math.random() * 100; // %
    const duracao = 6 + Math.random() * 8; // segundos
    const atraso = Math.random() * 10; // segundos
    const tamanho = 14 + Math.random() * 18; // px

    coracao.style.left = posicaoEsquerda + "%";
    coracao.style.fontSize = tamanho + "px";
    coracao.style.animationDuration = duracao + "s";
    coracao.style.animationDelay = atraso + "s";

    container.appendChild(coracao);
  }
}

gerarCoracoesFundo("corações-fundo-1", 16);
gerarCoracoesFundo("corações-fundo-2", 16);

/* ============================================================
   EXPLOSÃO DE CORAÇÕES AO ACERTAR A SENHA
   ============================================================ */
function criarExplosaoDeCoracoes() {
  const simbolosCoracao = ["❤️", "💗", "💕", "💖", "✨"];
  const quantidade = 26;

  for (let i = 0; i < quantidade; i++) {
    const coracao = document.createElement("span");
    coracao.textContent = simbolosCoracao[Math.floor(Math.random() * simbolosCoracao.length)];
    coracao.style.position = "fixed";
    coracao.style.left = 50 + (Math.random() * 60 - 30) + "vw";
    coracao.style.top = "45vh";
    coracao.style.fontSize = 18 + Math.random() * 20 + "px";
    coracao.style.pointerEvents = "none";
    coracao.style.zIndex = "999";
    coracao.style.transition = "transform 1.1s ease-out, opacity 1.1s ease-out";
    document.body.appendChild(coracao);

    // dispara a animação no próximo frame
    requestAnimationFrame(() => {
      const deslocamentoX = (Math.random() * 240 - 120) + "px";
      const deslocamentoY = -(150 + Math.random() * 200) + "px";
      coracao.style.transform = `translate(${deslocamentoX}, ${deslocamentoY}) rotate(${Math.random() * 360}deg)`;
      coracao.style.opacity = "0";
    });

    setTimeout(() => coracao.remove(), 1200);
  }
}

/* ============================================================
   CONFETES DA TELA DE SURPRESA
   ============================================================ */
function criarConfetes() {
  const container = document.getElementById("confetes");
  if (!container || container.dataset.gerado === "true") return; // evita duplicar
  container.dataset.gerado = "true";

  const cores = ["#ff5fa2", "#f6c453", "#ffffff", "#e8407f", "#ffb6d9"];
  const quantidade = 40;

  for (let i = 0; i < quantidade; i++) {
    const confete = document.createElement("span");
    confete.className = "confete";
    confete.style.left = Math.random() * 100 + "%";
    confete.style.background = cores[Math.floor(Math.random() * cores.length)];
    confete.style.animationDuration = 3 + Math.random() * 4 + "s";
    confete.style.animationDelay = Math.random() * 4 + "s";
    confete.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    container.appendChild(confete);
  }
}

/* ============================================================
   CONTADOR DO NOSSO AMOR — atualiza a cada segundo
   ============================================================ */
const elAnos = document.getElementById("contador-anos");
const elMeses = document.getElementById("contador-meses");
const elDias = document.getElementById("contador-dias");
const elHoras = document.getElementById("contador-horas");
const elMinutos = document.getElementById("contador-minutos");
const elSegundos = document.getElementById("contador-segundos");

function atualizarContador() {
  const agora = new Date();

  // Calcula a diferença em anos, meses e dias considerando o calendário real
  let anos = agora.getFullYear() - DATA_INICIO_NAMORO.getFullYear();
  let meses = agora.getMonth() - DATA_INICIO_NAMORO.getMonth();
  let dias = agora.getDate() - DATA_INICIO_NAMORO.getDate();
  let horas = agora.getHours() - DATA_INICIO_NAMORO.getHours();
  let minutos = agora.getMinutes() - DATA_INICIO_NAMORO.getMinutes();
  let segundos = agora.getSeconds() - DATA_INICIO_NAMORO.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    // pega o número de dias do mês anterior ao mês atual
    const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }

  elAnos.textContent = Math.max(anos, 0);
  elMeses.textContent = Math.max(meses, 0);
  elDias.textContent = Math.max(dias, 0);
  elHoras.textContent = Math.max(horas, 0);
  elMinutos.textContent = Math.max(minutos, 0);
  elSegundos.textContent = Math.max(segundos, 0);
}

atualizarContador();
setInterval(atualizarContador, 1000);