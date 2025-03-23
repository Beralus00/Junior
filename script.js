const boardSize = 10;
let currentPlayer = 'X';
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
let gameOver = false;

// Create board cells
const gameBoard = document.getElementById('gameBoard');
for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', () => handleClick(i, j));
        gameBoard.appendChild(cell);
    }
}

function handleClick(row, col) {
    if (gameOver || board[row][col] !== '') return;
    board[row][col] = currentPlayer;
    updateBoard();
    if (checkWinner(row, col)) {
        document.querySelector('.status').innerText = `Jwè ${currentPlayer === 'X' ? 1 : 2} ( ${currentPlayer} ) genyen! 🏆`;
        gameOver = true;
    } else if (board.flat().every(cell => cell !== '')) {
        document.querySelector('.status').innerText = "Jwèt la fini an egalite!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.querySelector('.status').innerText = `Jwè ${currentPlayer === 'X' ? 1 : 2} ( ${currentPlayer} ) a kounye a!`;
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.innerText = board[row][col];
        cell.style.color = board[row][col] === 'X' ? 'red' : 'blue';
    });
}

function checkWinner(row, col) {
    const directions = [
        [[1, 0], [-1, 0]], // Vertical
        [[0, 1], [0, -1]], // Horizontal
        [[1, 1], [-1, -1]], // Diagonal /
        [[1, -1], [-1, 1]]  // Diagonal \
    ];

    for (let dir of directions) {
        let count = 1;
        for (let [dx, dy] of dir) {
            let x = row + dx;
            let y = col + dy;
            while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === currentPlayer) {
                count++;
                x += dx;
                y += dy;
            }
        }
        if (count >= 5) return true;
    }
    return false;
}

function resetGame() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
    gameOver = false;
    currentPlayer = 'X';
    document.querySelector('.status').innerText = 'Jwè 1 (X) a kòmanse!';
    updateBoard();
}
