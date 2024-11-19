const chatBox = document.getElementById('chatBox');
const userMessageInput = document.getElementById('userMessage');
const sendMessageButton = document.getElementById('sendMessage');

let perguntas = [
    "Qual é o objetivo principal do processo?",
    "Quais são as metas específicas para este processo?",
    "Quais documentos são gerados durante o processo atual?",
    "Quais são os principais gargalos ou desafios enfrentados no processo atual?",
    "Existem indicadores ou controles já em uso para monitorar este processo?",
    "Quais melhorias você acredita que podem ser aplicadas?",
    "Quais mudanças poderiam resolver os gargalos identificados?",
    "Quais recursos adicionais são necessários para implementar estas melhorias?",
    "Você gostaria de validar o processo com algum stakeholder específico?",
    "Quais documentos finais ou relatórios serão necessários para formalizar o processo?",
    "Há algum treinamento ou suporte necessário para facilitar a implementação do novo processo?"
];
let respostas = [];
let perguntaIndex = 0;

// Função para ajustar a altura do textarea automaticamente até o limite
userMessageInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    if (this.scrollHeight > 150) {
        this.style.height = '150px';
    }
});

// Função para adicionar uma mensagem ao chat
function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.innerText = message;

    messageElement.appendChild(messageText);
    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática
}

// Função para enviar a próxima pergunta
function perguntar() {
    if (perguntaIndex < perguntas.length) {
        const perguntaAtual = perguntas[perguntaIndex];
        addMessageToChat(perguntaAtual, 'ai');
        perguntaIndex++;
    } else {
        // Finaliza e exibe todas as respostas coletadas
        exibirRespostas();
    }
}

// Função para capturar a resposta do usuário
function sendMessage() {
    const userMessage = userMessageInput.value;

    if (userMessage) {
        addMessageToChat(userMessage, 'user');
        respostas.push(userMessage); // Armazena a resposta
        userMessageInput.value = '';
        userMessageInput.style.height = 'auto';

        // Chamada à API após o envio da resposta
        enviarParaAPI(userMessage).then(() => {
            perguntar(); // Pergunta a próxima após receber resposta da API
        }).catch((error) => {
            console.error("Erro ao enviar a resposta para a API:", error);
            addMessageToChat("Erro ao processar a resposta. Tente novamente.", 'ai');
        });
    }
}

// Função para enviar a resposta para a API
function enviarParaAPI(mensagem) {
    return fetch('https://sua-api.com/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resposta: mensagem })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => {
            // Exibir no chat ou processar o retorno da API, se necessário
            addMessageToChat(`Resposta da API: ${data.message}`, 'ai');
        });
}

// Função para exibir todas as respostas no formato desejado
function exibirRespostas() {
    let resultadoFinal = "Respostas coletadas:\n\n";
    perguntas.forEach((pergunta, index) => {
        resultadoFinal += `${pergunta}: ${respostas[index]}\n`;
    });

    addMessageToChat("Todas as perguntas foram respondidas. Obrigado!", 'ai');
}

// Evento de clique para enviar a mensagem
sendMessageButton.addEventListener('click', sendMessage);

// Evento de tecla para enviar a mensagem com Enter
userMessageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Iniciar o fluxo de perguntas
perguntar();
