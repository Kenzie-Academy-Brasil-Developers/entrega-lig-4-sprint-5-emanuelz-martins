const mainTable = document.querySelector('#main-container');
const mapArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];
const columns = document.querySelectorAll('.column');
const rows = document.querySelectorAll('.row');
let lastIndex = Number;

let diskCount = 0;
let counter = 1;
let match = false;

createTable();

for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", event => {
        boardMoves(i);
    });
}

function createTable() {
    for (let column = 0; column < 7; column++) {
        const tableColumn = document.createElement('div');
        tableColumn.classList.add('column');

        for (let row = 0; row < 6; row++) {
            const tableRow = document.createElement('div');
            tableRow.classList.add('row');

            tableColumn.appendChild(tableRow);
        }

        mainTable.appendChild(tableColumn);
    }
}

function boardMoves(index) {
    const blackBall = document.createElement("div");
        blackBall.classList.add("blackBall");
    const redBall = document.createElement("div");
        redBall.classList.add("redBall");

    for (let i = 5; i >= 0; i--) {
        let freeSpace = columns[index].childNodes[i];
        let numberOfSpaces = columns[index].childNodes[i].childElementCount;

        if (numberOfSpaces === 0 && match === false) {
            freeSpace.appendChild(blackBall);
            mapArray[i][index] = 1;
            match = true;
            lastIndex = i;
            diskCount++;
            break;
        }
        else if (numberOfSpaces === 0 && match === true) {
            freeSpace.appendChild(redBall);
            mapArray[i][index] = 2;
            match = false;
            lastIndex = i;
            diskCount++;
            break;
        }
    }
    //  CHAMAR VERIFICAÇÃO DE VITÓRIA (INDEX);
}

function diagonalVictory(arr) {

    if (upRightDownLeft(arr) === true) {
        console.log("win for Up Right Down Left");
    }
    counter = 1;

    if (upLeftDownRight(arr) === true) {
        console.log("win for Up Left Down Right");
    }
    counter = 1;
}

function upRightDownLeft(arr) {
    let check = [arr[0], arr[1]];

    if (check[0] > 0) {
        while (mapArray[check[0]][check[1]] === mapArray[check[0] - 1][check[1] + 1]) {
            counter += 1;
            check[0] -= 1;
            check[1] += 1;
            if (check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                break;
            }
        }
    }

    check = [arr[0], arr[1]]

    if (check[0] < 5) {
        while (mapArray[check[0]][check[1]] === mapArray[check[0] + 1][check[1] - 1]) {
            counter += 1;
            check[0] += 1;
            check[1] -= 1;
            if (check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                break;
            }
        }
    }

    if (counter === 4) {
        return true;
    } else {
        return false;
    }
}

function upLeftDownRight(arr) {
    let check = [arr[0], arr[1]];

    if (check[0] > 0) {
        while (mapArray[check[0]][check[1]] === mapArray[check[0] - 1][check[1] - 1]) {
            counter += 1;
            check[0] -= 1;
            check[1] -= 1;
            if (check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                break;
            }
        }
    }

    check = [arr[0], arr[1]];

    if (check[0] < 5) {
        while (mapArray[check[0]][check[1]] === mapArray[check[0] + 1][check[1] + 1]) {
            counter += 1;
            check[0] += 1;
            check[1] += 1;
            if (check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                break;
            }
        }
    }

    if (counter === 4) {
        return true;
    } else {
        return false;
    }
}
