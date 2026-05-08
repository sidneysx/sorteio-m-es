let numerosSorteados = [];

function sortearNumero() {
  const inicio = parseInt(document.getElementById("inicio").value);
  const fim = parseInt(document.getElementById("fim").value);

  if (isNaN(inicio) || isNaN(fim)) {
    alert("⚠️ Preencha os números inicial e final para começar!");
    return;
  }

  if (inicio >= fim) {
    alert("⚠️ O número final deve ser maior que o inicial!");
    return;
  }

  const totalNumeros = fim - inicio + 1;

  if (numerosSorteados.length >= totalNumeros) {
    alert("✓ Todos os números foram sorteados neste intervalo!");
    return;
  }

  let numero;

  do {
    numero = Math.floor(Math.random() * totalNumeros) + inicio;
  } while (numerosSorteados.includes(numero));

  numerosSorteados.push(numero);

  
  const resultadoDiv = document.getElementById("resultado");
  const duracao = 1000; 
  const velocidadeInicial = 70;
  const velocidadeFinal = 150;

  let tempoDecorrido = 0;
  let ultimoNumeroExibido = inicio;

  function animar() {
    tempoDecorrido += velocidadeInicial;

    const progresso = tempoDecorrido / duracao;
    const velocidadeAtual =
      velocidadeInicial +
      (velocidadeFinal - velocidadeInicial) * (progresso * progresso);

    
    ultimoNumeroExibido = Math.floor(Math.random() * totalNumeros) + inicio;
    resultadoDiv.innerText = ultimoNumeroExibido;

    
    resultadoDiv.style.transform = `scale(${1 + Math.sin(progresso * Math.PI * 8) * 0.1})`;

    if (tempoDecorrido < duracao) {
      setTimeout(animar, velocidadeAtual);
    } else {
      resultadoDiv.innerText = numero;
      resultadoDiv.style.transform = "scale(1)";
      atualizarHistorico();
    }
  }

  animar();
}

function atualizarHistorico() {
  const historico = document.getElementById("historico");
  historico.innerHTML = "";

  numerosSorteados.forEach((numero, index) => {
    const badge = document.createElement("div");
    badge.className =
      "bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 transition flex items-center gap-2";
    badge.innerHTML = `
    <i class="fas fa-check-circle text-white"></i>
    ${numero}
  `;
    historico.appendChild(badge);
  });

  if (numerosSorteados.length === 0) {
    historico.innerHTML =
      '<p class="text-gray-400 italic">Nenhum número sorteado ainda...</p>';
  }
}

function limparHistorico() {
  if (numerosSorteados.length === 0) {
    alert("Nada para limpar!");
    return;
  }

  if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
    numerosSorteados = [];
    document.getElementById("historico").innerHTML =
      '<p class="text-gray-400 italic">Nenhum número sorteado ainda...</p>';
    document.getElementById("resultado").innerText = "-";
  }
}

// Inicializar histórico vazio
document.addEventListener("DOMContentLoaded", () => {
  atualizarHistorico();
  document.getElementById("resultado").style.transition = "all 0.3s ease";
});
