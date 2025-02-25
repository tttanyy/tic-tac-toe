const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [];
let stepNumber = 0;
let currentPlayer = CROSS;
let isWin = false;
let gridSize = 3; 


startGame();

function startGame() {
    const sizeInput = prompt("Введите размер игрового поля", "3");
    if (sizeInput && !isNaN(sizeInput) && parseInt(sizeInput) > 0) {
        gridSize = parseInt(sizeInput);
    } else {
        alert("Некорректный размер. Используется значение по умолчанию: 3x3");
        gridSize = 3;
    }

    field = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    renderGrid(gridSize);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    if (isWin) return;

    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!field[row][col]) {
        field[row][col] = currentPlayer;
        renderSymbolInCell(currentPlayer, row, col);
        stepNumber++;

        const winner = checkWinner();
        if (winner) {
            alert(`Победил игрок ${winner}!`);
            isWin = true;
        } else if (stepNumber === field.length * field.length) {
            alert("Победила дружба");
            return;
        }

        currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    } else {
        console.log('Клетка уже занята!');
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner() {
    const size = field.length;

    for (let i = 0; i < size; i++) {
        if (field[i][0] && field[i].every(cell => cell === field[i][0])) {
            highlightCells(field.map((_, col) => [i, col]));
            return field[i][0];
        }
    }

    for (let j = 0; j < size; j++) {
        if (field[0][j] && field.every(row => row[j] === field[0][j])) {
            highlightCells(field.map((_, row) => [row, j]));
            return field[0][j];
        }
    }

    if (field[0][0] && field.every((row, idx) => row[idx] === field[0][0])) {
        highlightCells(field.map((_, idx) => [idx, idx]));
        return field[0][0];
    }

    if (field[0][size - 1] && field.every((row, idx) => row[size - 1 - idx] === field[0][size - 1])) {
        highlightCells(field.map((_, idx) => [idx, size - 1 - idx]));
        return field[0][size - 1];
    }

    return null;
}

function highlightCells(cells) {
    cells.forEach(([row, col]) => {
        const cell = findCell(row, col);
        cell.style.color = 'red';
    });
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}


function resetClickHandler() {
    field = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    stepNumber = 0;
    currentPlayer = CROSS;
    isWin = false;
    renderGrid(gridSize);
}

addResetListener();

/* Test Function */
/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
