import {openDiagram} from './main.js';

const chatBox = document.getElementById('chatBox');
const userMessageInput = document.getElementById('userMessage');
const sendMessageButton = document.getElementById('sendMessage');

let perguntasTOBEnome = [
    "Qual é o nome e o objetivo principal do processo desejado?"
];

let perguntasTOBEentrevista = [
"**Qual é o nome do processo e qual é seu objetivo principal?** (Ex: Nome do processo: Solicitação de Férias; Objetivo: Garantir o planejamento e controle adequados das férias dos funcionários.)",
"**Quais são as principais etapas do processo e quem são os responsáveis e envolvidos em cada uma delas?** (Ex: Etapas: Preenchimento de formulário, aprovação do gestor, envio para o RH; Responsáveis: Funcionário, gestor direto, equipe de RH.)",
"**Quais informações, sistemas e ferramentas são usados para executar o processo?** (Ex: Informações: Dados de férias e saldo de dias; Sistemas: Sistema de gestão de RH, planilhas Excel; Ferramentas: Plataforma de BPM, e-mails automatizados.)",
"**Quais são as entradas e saídas específicas esperadas em cada etapa?** (Ex: Entradas: Solicitação do funcionário, saldo de férias; Saídas: Confirmação de aprovação, calendário atualizado, documento oficial de férias.)",
"**Há variações ou exceções no processo que precisam de atenção especial? Se sim, como elas são tratadas?** (Ex: Exceções: Férias emergenciais, cancelamentos; Tratamento: Aprovação acelerada pelo gestor, comunicação direta com o RH.)",
"**Quais regras de negócio orientam o processo?** (Ex: Regras: Funcionário deve ter saldo positivo de férias, pré-aviso de 30 dias, limite de 30 dias de férias consecutivos.)",
"**Quais indicadores de desempenho monitoram a eficiência do processo?** (Ex: Indicadores: Tempo médio de aprovação, número de solicitações aprovadas por mês, taxa de cancelamento de férias.)",
"**Quais são os principais riscos do processo e como eles são mitigados?** (Ex: Riscos: Aprovações tardias, falta de cobertura para férias; Mitigação: Automação de alertas, plano de backup de equipe.)",
"**Que documentos são gerados e arquivados durante o processo?** (Ex: Documentos: Formulário de solicitação de férias, aprovação do gestor, comprovante de saldo de férias.)",
"**Há sugestões de melhorias ou automações que poderiam otimizar o processo?** (Ex: Melhorias: Implementação de sistema de autoatendimento para solicitações, automação de aprovações, integração com calendário digital.)",

    ];

let perguntasMelhoria = [
    "Quais melhorias você gostaria de aplicar no processo atual?",
    "Quais desafios precisam ser superados para melhorar o processo?",
    "Quais recursos ou apoio seriam necessários para essas melhorias?",
    "Você gostaria de validar o processo com algum stakeholder?",
    "Quais documentos finais ou relatórios serão necessários?"
];
let diagramXML = ""
let respostas = [];
let perguntaIndex = 0;
let DadosParaBPMN = ""
let perguntasAtuais = [];
let aguardandoConfirmacaoBPMN = false;
let tipo = '';  // Variável para armazenar o tipo de processo selecionado

userMessageInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight > 150 ? 150 : this.scrollHeight) + 'px';
});

function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.innerText = message;

    messageElement.appendChild(messageText);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function introduzirIA() {
    const introducao = "Olá, eu sou a FluxoLize AI! Posso ajudar em:\n1. Mapear o Processo AS IS com foco no mapeamento TO BE.\n2. Mapear o processo TO BE.\n3. Realizar melhorias no processo aberto.\n\nPor favor, escolha uma das opções abaixo ou digite o número correspondente à opção desejada.";
    addMessageToChat(introducao, 'ai');
}

function capturarEscolha(escolha) {
    switch (escolha) {
        case '1':
            perguntasAtuais = perguntasTOBEnome;
            tipo = "mapear-to-be-nome";  // Define o tipo para a opção 1
            addMessageToChat("Opção selecionada: Mapeamento TO BE aparti do nome do processo.", 'ai');
            break;
        case '2':
            perguntasAtuais = perguntasTOBEentrevista;
            tipo = "mapear-to-be";  // Define o tipo para a opção 2
            addMessageToChat("Opção selecionada: Mapeamento TO BE de uma entrevista.", 'ai');
            break;
        case '3':
            perguntasAtuais = perguntasMelhoria;
            tipo = "melhorar-processo";  // Define o tipo para a opção 3
            addMessageToChat("Opção selecionada: Melhorias no processo.", 'ai');
            break;
        default:
            addMessageToChat("Opção inválida. Por favor, escolha 1, 2 ou 3.", 'ai');
            return;
    }

    perguntaIndex = 0;
    setTimeout(perguntar, 1000);
}

function perguntar() {
    if (perguntaIndex < perguntasAtuais.length) {
        addMarkdownMessageToChat(perguntasAtuais[perguntaIndex], 'ai');
        perguntaIndex++;
    } else {
        exibirRespostas(); // Consolidar respostas ao final e chamar API
    }
}

function sendMessage() {
    const userMessage = userMessageInput.value.trim();

    if (userMessage) {
        addMessageToChat(userMessage, 'user');
        if (perguntasAtuais.length === 0) {
            capturarEscolha(userMessage);
        } else if (aguardandoConfirmacaoBPMN) {
            processarConfirmacaoBPMN(userMessage);
        } else {
            respostas.push(userMessage);
            userMessageInput.value = '';
            userMessageInput.style.height = 'auto';
            setTimeout(perguntar, 1000);
        }
    }
}

function enviarParaAPI(mensagem, tipo) {
    addMessageToChat('Gerando Documentação...', 'ai');
    return fetch('http://127.0.0.1:5000/iniciar-processo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Dados: mensagem,
            tipo: tipo  // Usa o tipo selecionado
        })
    })
        .then(response => response.json())
        .then(data => {
            // addMessageToChat(data.result, 'ai');
            DadosParaBPMN = data.result;
            initializeSimpleMDE(DadosParaBPMN);
            addMarkdownMessageToChat(data.result, 'ai');
            setTimeout(perguntarCriacaoBPMN, 1000);

        })
        .catch(error => {
            console.error("Erro ao enviar a resposta para a API:", error);
            addMessageToChat("Erro ao processar a resposta. Tente novamente.", 'ai');
        });
}

function addMarkdownMessageToChat(markdownText, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');

    const converter = new showdown.Converter();
    converter.setOption('simplifiedAutoLink', true);
    converter.setOption('tables', true);
    converter.setOption('ghCompatibleHeaderId', true);
    converter.setOption('parseImgDimensions', true);

    let formattedText = converter.makeHtml(markdownText);

    messageText.innerHTML = formattedText;
    messageElement.appendChild(messageText);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function exibirRespostas() {
    let resultadoFinal = "Nome do processo e objetivo principal do processo: " + (respostas[0] || '') + "\n" +
        "Principais etapas do processo e responsáveis e envolvidos: " + (respostas[1] || '') + "\n" +
        "Informações, sistemas e ferramentas usados para executar o processo: " + (respostas[2] || '') + "\n" +
        "Quais são as entradas e saídas específicas esperadas em cada etapa: " + (respostas[3] || '') + "\n" +
        "Há variações ou exceções no processo que precisam de atenção especial: " + (respostas[4] || '') + "\n" +
        "Regras de negócio do processo: " + (respostas[5] || '') + "\n" +
        "Indicadores de desempenho que monitoram a eficiência do processo: " + (respostas[6] || '') + "\n" +
        "Principais riscos do processo e mitigações: " + (respostas[7] || '') + "\n" +
        "Documentos gerados e arquivados durante o processo: " + (respostas[8] || '') + "\n" +
        "Sugestões de melhorias ou automações que poderiam otimizar o processo: " + (respostas[9] || '') + "\n";


    // addMessageToChat(resultadoFinal, 'ai');

    // Chama a API com a mensagem consolidada e o tipo selecionado
    enviarParaAPI(resultadoFinal, tipo);

}

function perguntarCriacaoBPMN() {
    addMessageToChat("Deseja criar o processo BPMN com base nas respostas coletadas? (Sim/Não)", 'ai');
    aguardandoConfirmacaoBPMN = true;
}

function processarConfirmacaoBPMN(resposta) {
    if (resposta.toLowerCase() === 'sim') {
        addMessageToChat("Ótimo! Iniciaremos o processo de criação do BPMN.", 'ai');
        criarProcessoBPMN(DadosParaBPMN);
    } else {
        addMessageToChat("Entendido! Caso precise de mais assistência, estou à disposição.", 'ai');
    }
    aguardandoConfirmacaoBPMN = false;
}

function criarProcessoBPMN(DadosParaBPMN) {
    addMessageToChat('Desenhando Processo...', 'ai');
    return fetch('http://127.0.0.1:5000/iniciar-processo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Dados: DadosParaBPMN,
            tipo: "gerar-bpmn"  // Usa o tipo selecionado
        })
    })
        .then(response => response.json())
        .then(data => {
            // addMessageToChat(data.result, 'ai');
            addMessageToChat(data.result, 'ai');
            diagramXML = data.result;
            openDiagram(diagramXML);

        })
        .catch(error => {
            console.error("Erro ao enviar a resposta para a API:", error);
            addMessageToChat("Erro ao processar a resposta. Tente novamente.", 'ai');
        });
}

sendMessageButton.addEventListener('click', sendMessage);

userMessageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

introduzirIA();
let teste = './resources/newDiagram.bpmn';

// Carregar o arquivo BPMN dinamicamente com fetch
export async function fetchDiagramXML() {
    try {
        const response = await fetch(teste);
        if (!response.ok) {
            throw new Error('Failed to fetch the BPMN diagram.');
        }
        return await response.text();
    } catch (error) {
        console.error('Error fetching BPMN diagram:', error);
        return null;
    }
}

const diagramXMLmodelos = await fetchDiagramXML();
if (diagramXML == "") {
    openDiagram(diagramXMLmodelos);
}

document.querySelectorAll('.choice-button').forEach((button, index) => {
    button.addEventListener('click', () => capturarEscolha((index + 1).toString()));
});

function initializeSimpleMDE(DadosParaBPMN) {

    var simplemde = new SimpleMDE({
        element: document.querySelector(".simplemde"),
        forceSync: true,
        spellChecker: false,
        initialValue: DadosParaBPMN,
        toolbar: [
            {
                name: "bold",
                action: SimpleMDE.toggleBold,
                className: "fa fa-bold",
                title: "Bold"
            },
            {
                name: "italic",
                action: SimpleMDE.toggleItalic,
                className: "fa fa-italic",
                title: "Italic"
            },
            {
                name: "heading",
                action: SimpleMDE.toggleHeadingSmaller,
                className: "fa fa-header",
                title: "Heading"
            },
            {
                name: "quote",
                action: SimpleMDE.toggleBlockquote,
                className: "fa fa-quote-left",
                title: "Quote"
            },
            {
                name: "unordered-list",
                action: SimpleMDE.toggleUnorderedList,
                className: "fa fa-list-ul",
                title: "Unordered List"
            },
            {
                name: "ordered-list",
                action: SimpleMDE.toggleOrderedList,
                className: "fa fa-list-ol",
                title: "Ordered List"
            },
            {
                name: "link",
                action: SimpleMDE.drawLink,
                className: "fa fa-link",
                title: "Link"
            },
            {
                name: "image",
                action: SimpleMDE.drawImage,
                className: "fa fa-image",
                title: "Insert Image"
            },
            {
                name: "preview",
                action: SimpleMDE.togglePreview,
                className: "fa fa-eye no-disable",
                title: "Preview"
            },
            {
                name: "side-by-side",
                action: SimpleMDE.toggleSideBySide,
                className: "fa fa-columns no-disable no-mobile",
                title: "Side by Side"
            },
            {
                name: "fullscreen",
                action: SimpleMDE.toggleFullScreen,
                className: "fa fa-arrows-alt no-disable no-mobile",
                title: "Fullscreen"
            },
            {
                name: "guide",
                action: "https://simplemde.com/markdown-guide",
                className: "fa fa-question-circle",
                title: "Markdown Guide"
            }
        ]
    });
    // Definir o valor inicial após a criação do editor
    if (DadosParaBPMN) {
        simplemde.value(DadosParaBPMN);

        // Forçar atualização do editor para renderizar o texto imediatamente
        simplemde.codemirror.refresh();
    }
    return simplemde;
}


