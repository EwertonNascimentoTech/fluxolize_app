const chatBox = document.getElementById('chatBox');
const userMessageInput = document.getElementById('userMessage');
const sendMessageButton = document.getElementById('sendMessage');

// Função para ajustar a altura do textarea automaticamente até o limite
userMessageInput.addEventListener('input', function () {
    this.style.height = 'auto';  // Redefine a altura antes de medir
    this.style.height = (this.scrollHeight) + 'px';  // Ajusta a altura com base no conteúdo
    if (this.scrollHeight > 150) {  // Limita a altura máxima a 150px
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

    // Rolagem automática para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para enviar a mensagem
function sendMessage() {
    const userMessage = userMessageInput.value;

    if (userMessage) {
        // Adiciona a mensagem do usuário ao chat
        addMessageToChat(userMessage, 'user');

        // Limpa o campo de entrada
        userMessageInput.value = '';
        userMessageInput.style.height = 'auto'; // Redefine a altura do textarea

        // Simulação de resposta da IA (substitua por chamada de API para integração real com IA)
        setTimeout(() => {
            // Simula uma resposta da IA
            const aiResponses = [
                "Sure, I'm here to help!",
                "Let me check that for you.",
                "Your order will arrive tomorrow!",
                "How else can I assist you?",
                "Thank you for reaching out! 😊"
            ];
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessageToChat(randomResponse, 'ai');
        }, 1000); // Atraso de 1 segundo para simular a resposta da IA
    }
}

// Evento de clique para enviar a mensagem
sendMessageButton.addEventListener('click', sendMessage);

// Evento de tecla para enviar a mensagem com Enter
userMessageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o comportamento padrão (nova linha)
        sendMessage(); // Chama a função de envio
    }
});