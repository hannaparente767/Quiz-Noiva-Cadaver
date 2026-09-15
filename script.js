/* 
Arquivo: script.js
Função: controlar a lógica do quiz.
Usa switch case para verificar respostas e atualizar a pontuação.
*/

// Array de perguntas e respostas
const perguntas = [
    {
        pergunta: "Qual é o nome do protagonista masculino em 'A Noiva-Cadáver'?",
        opcoes: ["Victor", "Vincent", "Vlad", "Verne"],
        resposta: "Victor"
    },

    {
        pergunta: "Em que tipo de ambiente Emily vive?",
        opcoes: ["Num castelo", "No mundo dos mortos", "No mundo dos vivos", "Numa floresta mágina"],
        resposta: "No mundo dos mortos"
    },

    {
        pergunta: "Qual o nome do cachorro esquelético de Victor?",
        opcoes: ["Sparky", "Zero", "Bones", "Scraps"],
        resposta: "Scraps"
    },

    {
        pergunta: "O que Victor faz acidentalmente para casar-se com Emily?",
        opcoes: [
            "Bebe uma poção mágica",
            "Lê o feitiço em voz alta",
            "Assina um contrato sem ver",
            "Coloca o anel em um galho que era o dedo dela"
        ],
        resposta: "Coloca o anel em um galho que era o dedo dela"
    },

    {
        pergunta: "Quem dirigiu o filme 'A Noiva-Cadáver'?",
        opcoes: ["Henry Selick", "Tim Burton", "Guillermo del Toro", "Neil Gaiman"],
        resposta: "Tim Burton"
    },
];

// Variáveis para controlar o progresso do quiz
let indicePergunta = 0;
let pontuacao = 0;

// Pega elementos do HTML
const perguntaEl = document.getElementById("question");
const opcoesEl = document.getElementById("options");
const próximoBtn = document.getElementById("next-btn");
const resultadoEl = document.getElementById("result");

// Função para mostrar a pergunta atual
function mostrarPergunta() {
    // Limpa conteúdo anterior
    opcoesEl.innerHTML = "";
    resultadoEl.textContent = "";
    próximoBtn.style.display = "none"; // Esconde o botão até responder

    // Mostrar a nova pergunta
    const questaoAtual = perguntas[indicePergunta];
    perguntaEl.textContent = questaoAtual.pergunta;

    // Criar botões para cada opção
    questaoAtual.opcoes.forEach(opcao => {
        const botao = document.createElement("button");
        botao.textContent = opcao;
        botao.classList.add("option");
        botao.addEventListener("click", () => verifircarResposta(botao, opcao));
        opcoesEl.appendChild(botao);
    });
}

// Função para verificar se a resposta está correta
function verifircarResposta(botaoSelecionado, opcaoSelecionada) {
    const respostaCorreta = perguntas[indicePergunta].resposta;

    // Desabilita todos os botões (mas mantém visual selecionado)
    const botoes = document.querySelectorAll(".option");
    botoes.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("selected"); // remove seleção antiga
    });

    // Marca o botão clicado como selecionado
    botaoSelecionado.classList.add("selected");

    // Mostra resultado (sem cor verde/vermelha)
    if (opcaoSelecionada === respostaCorreta) {
        resultadoEl.textContent = "Correto!";
        pontuacao++;
    } else {
        resultadoEl.textContent = `Errado! A resposta correta é "${respostaCorreta}".`;
    }

    // Mostra o botão "Próxima" só depois de responder
    próximoBtn.style.display = "block";
}

// Função para passar para a próxima pergunta
próximoBtn.addEventListener("click", () => {
    indicePergunta++;

    if (indicePergunta < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultadoFinal();
    }
});

// Mostrar pontuação final
function mostrarResultadoFinal() {
    perguntaEl.textContent = "Fim do Quiz!";
    opcoesEl.innerHTML = "";
    resultadoEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
    próximoBtn.style.display = "none";
}

// Iniciar quiz
mostrarPergunta();
