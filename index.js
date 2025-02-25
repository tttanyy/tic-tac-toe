const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let field = [[null, null, null], [null, null, null], [null, null, null]]

let stepNumber = 0;
let currentPlayer = CROSS;
let isWin = false;


startGame();
addResetListener();

function startGame() {
    renderGrid(3);
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
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (!field[row][col]) {
        field[row][col] = currentPlayer;
        renderSymbolInCell(currentPlayer, row, col);
        stepNumber++;

        const winner = checkWinner();
        if (winner) {
            alert(`Победил игрок ${winner}!`);
            isWin = true; // Установить флаг победы
        } else if (stepNumber === field.length * field.length) {
            alert("Победила дружба");
            return;
        }

        if (!isWin) {
            currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
        }
    } else {
        console.log('Клетка уже занята!');
    }


    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner() {
    const size = field.length;

    // Проверка строк
    for (let i = 0; i < size; i++) {
        if (field[i][0] && field[i][0] === field[i][1] && field[i][0] === field[i][2]) {
            highlightCells([[i, 0], [i, 1], [i, 2]]);
            return field[i][0];
        }
    }

    // Проверка столбцов
    for (let i = 0; i < size; i++) {
        if (field[0][i] && field[0][i] === field[1][i] && field[0][i] === field[2][i]) {
            highlightCells([[0, i], [1, i], [2, i]]);
            return field[0][i];
        }
    }

    // Проверка диагоналей
    if (field[0][0] && field[0][0] === field[1][1] && field[0][0] === field[2][2]) {
        highlightCells([[0, 0], [1, 1], [2, 2]]);
        return field[0][0];
    }
    if (field[0][2] && field[0][2] === field[1][1] && field[0][2] === field[2][0]) {
        highlightCells([[0, 2], [1, 1], [2, 0]]);
        return field[0][2];
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
    console.log('reset!');
}


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
