const btnSize = 6;
const wincondition = 3;
let allCells = Array(btnSize).fill().map(() => Array(btnSize).fill(null));
let currentPlayer = 'X';
let gameOver = false;

const container = document.getElementById('board-container');
const Game = document.getElementById('game');
const message = document.getElementById('message');

for (let row = 0; row<btnSize; row++) {
    for (let colm = 0; colm<btnSize; colm++) {
        const button = document.createElement('button');
        button.classList.add('cell');
        button.setAttribute('row-Data', row);
        button.setAttribute('colm-Data', colm);
        button.addEventListener('click', playAndWin);
        Game.appendChild(button);
        // console.log(button);
    }
}

function playAndWin(event) {
    if (gameOver){ return};
    const row = parseInt(event.target.getAttribute('row-Data'));
    const colm = parseInt(event.target.getAttribute('colm-Data'));

    if (allCells[row][colm] !== null) {return};

    allCells[row][colm] = currentPlayer;
    // console.log(currentPlayer)
    event.target.textContent = currentPlayer;
    if (checkWinner(currentPlayer)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        console.log("stop");
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    //console.log(currentPlayer)
}

function checkWinner(WhosePlaying) {
    return checkHorizontally(WhosePlaying) || checkVertically(WhosePlaying) || checkDiagonally(WhosePlaying);
}
function checkHorizontally(player) {
    for (let row = 0; row < btnSize; row++) {
        for (let colm = 0; colm <= btnSize - wincondition; colm++) {
            if (allCells[row][colm] === player &&
                allCells[row][colm + 1] === player &&
                allCells[row][colm + 2] === player) {
                return true;
            }
        }
    }
    return false;
}

function checkVertically(player) {
    for (let col = 0; col < btnSize; col++) {
        for (let row = 0; row <= btnSize - wincondition; row++) {
            if (allCells[row][col] === player &&
                allCells[row + 1][col] === player &&
                allCells[row + 2][col] === player) {
                return true;
            }
        }
    }
    return false;
}

function checkDiagonally(player) {
    for (let row = 0; row <= btnSize - wincondition; row++) {
        for (let colm = 0; colm <= btnSize - wincondition; colm++) {
            if (allCells[row][colm] === player &&
                allCells[row + 1][colm + 1] === player &&
                allCells[row + 2][colm + 2] === player) {
                return true;
            }
        }
    }
    for (let row = wincondition - 1; row < btnSize; row++) {
        for (let col = 0; col <= btnSize - wincondition; col++) {
            if (allCells[row][col] === player &&
                allCells[row - 1][col + 1] === player &&
                allCells[row - 2][col + 2] === player) {
                return true;
            }
        }
    }
    return false;
}

function resetGame() {
    allCells = Array(btnSize).fill().map(() => Array(btnSize).fill(null));
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = `Player ${currentPlayer}'s turn`;

    document.querySelectorAll('.cell').forEach(button => {
        button.textContent = '';
    });
}