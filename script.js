// --- 1. SELEÇÃO DOS ELEMENTOS DO DOM ---
const statusDisplay = document.querySelector('#status-display');
const restartButton = document.querySelector('#restart-button');
const cells = document.querySelectorAll('.cell');

// --- 2. VARIÁVEIS DO ESTADO DO JOGO ---
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

// Mensagens que vamos exibir
const winningMessage = () => `Jogador ${currentPlayer} venceu!`;
const drawMessage = () => `O jogo empatou!`;
const currentPlayerTurn = () => `É a vez do ${currentPlayer}`;

// --- 3. LÓGICA DO JOGO ---

// Condições de vitória (todas as 8 combinações)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para lidar com a jogada em uma célula
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer; // Atualiza nosso estado do jogo
    clickedCell.innerHTML = currentPlayer;       // Atualiza a interface
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Adiciona classe 'x' ou 'o' para cor
}

// Função para trocar o jogador
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Função para verificar o resultado (vitória ou empate)
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Se alguma célula da combinação estiver vazia, pula para a próxima
        }
        if (a === b && b === c) {
            roundWon = true; // Se forem todas iguais, alguém venceu
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // Verifica se houve empate
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // Se o jogo não acabou, passa a vez
    handlePlayerChange();
}

// Função para lidar com o clique na célula
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Verifica se a célula já foi jogada ou se o jogo acabou
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // Processa a jogada
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Função para reiniciar o jogo
function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('x', 'o');
    });
}

// --- 4. ADICIONANDO OS EVENT LISTENERS ---

// Adiciona um listener de clique a cada célula
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Adiciona um listener de clique ao botão de reiniciar
restartButton.addEventListener('click', handleRestartGame);


// --- 5. INICIALIZAÇÃO ---
// Exibe a mensagem inicial
statusDisplay.innerHTML = currentPlayerTurn();