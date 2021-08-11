const mainTable = document.querySelector('#main-container');
const columns = document.getElementsByClassName('column');
const rows = document.getElementsByClassName('row');
const arrow = document.querySelector('#arrow');
const mapArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

let lastIndex = Number;
let diskCount = 0;
let counter = 1;
let match = false;
let coords = [];
let draw = 0;

createTable();

for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", event => {
        let columnsArray = [...columns];
        let currentTarget = event.currentTarget;
        let index = columnsArray.findIndex((element) => element === currentTarget);
        boardMoves(index);
        diagonalVictory(coords);
        crossWins(coords);
        draw += 1;
        if (draw === 42) {
            alert("Draw!!!");
        }
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
            coords = [i, index];
            break;
        }
        else if (numberOfSpaces === 0 && match === true) {
            freeSpace.appendChild(redBall);
            mapArray[i][index] = 2;
            match = false;
            lastIndex = i;
            diskCount++;
            coords = [i, index];
            break;
        }
    }
}

function diagonalVictory(arr) {

    if (upRightDownLeft(arr) === true) {
        if (mapArray[arr[0]][arr[1]] === 1) {
            alert("Black Wins!!!")
            setTimeout(location.reload(), 2000)
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            alert("Red Wins!!!")
            setTimeout(location.reload(), 2000)
        }
    }
    counter = 1;

    if (upLeftDownRight(arr) === true) {
        if (mapArray[arr[0]][arr[1]] === 1) {
            alert("Black Wins!!!")
            setTimeout(location.reload(), 2000)
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            alert("Red Wins!!!")
            setTimeout(location.reload(), 2000)
        }
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

function crossWins(arr) {
    if (horizontalWins(arr) === true) {
        if (mapArray[arr[0]][arr[1]] === 1) {
            alert("Black Wins!!!");
            setTimeout(location.reload(), 2000);
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            alert("Red Wins!!!");
            setTimeout(location.reload(), 2000);
        }
    }

    if (verticalWins(arr) === true) {
        if (mapArray[arr[0]][arr[1]] === 1) {
            alert("Black Wins!!!");
            setTimeout(location.reload(), 2000);
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            alert("Red Wins!!!");
            setTimeout(location.reload(), 2000);
        }
    }

}

function horizontalWins(arr) {

    let row = arr[0];

    if (mapArray[row][0] != 0 && mapArray[row][1] != 0 && mapArray[row][0] === mapArray[row][1] &&
        mapArray[row][0] != 0 && mapArray[row][2] != 0 && mapArray[row][0] === mapArray[row][2] &&
        mapArray[row][0] != 0 && mapArray[row][3] != 0 && mapArray[row][0] === mapArray[row][3] ||
        mapArray[row][1] != 0 && mapArray[row][2] != 0 && mapArray[row][1] === mapArray[row][2] &&
        mapArray[row][1] != 0 && mapArray[row][3] != 0 && mapArray[row][1] === mapArray[row][3] &&
        mapArray[row][1] != 0 && mapArray[row][4] != 0 && mapArray[row][1] === mapArray[row][4] ||
        mapArray[row][2] != 0 && mapArray[row][3] != 0 && mapArray[row][2] === mapArray[row][3] &&
        mapArray[row][2] != 0 && mapArray[row][4] != 0 && mapArray[row][2] === mapArray[row][4] &&
        mapArray[row][2] != 0 && mapArray[row][5] != 0 && mapArray[row][2] === mapArray[row][5] ||
        mapArray[row][3] != 0 && mapArray[row][4] != 0 && mapArray[row][3] === mapArray[row][4] &&
        mapArray[row][3] != 0 && mapArray[row][5] != 0 && mapArray[row][3] === mapArray[row][5] &&
        mapArray[row][3] != 0 && mapArray[row][6] != 0 && mapArray[row][3] === mapArray[row][6]) {

        return true;

    } return false;
}


function verticalWins(arr) {

    let column = arr[1];

    if ((mapArray[0][column] != 0) && (mapArray[1][column] != 0) && (mapArray[0][column]) === (mapArray[1][column]) &&
        (mapArray[0][column] != 0) && (mapArray[2][column] != 0) && (mapArray[0][column]) === (mapArray[2][column]) &&
        (mapArray[0][column] != 0) && (mapArray[3][column] != 0) && (mapArray[0][column]) === (mapArray[3][column]) ||
        (mapArray[1][column] != 0) && (mapArray[2][column] != 0) && (mapArray[1][column]) === (mapArray[2][column]) &&
        (mapArray[1][column] != 0) && (mapArray[3][column] != 0) && (mapArray[1][column]) === (mapArray[3][column]) &&
        (mapArray[1][column] != 0) && (mapArray[4][column] != 0) && (mapArray[1][column]) === (mapArray[4][column]) ||
        (mapArray[2][column] != 0) && (mapArray[3][column] != 0) && (mapArray[2][column]) === (mapArray[3][column]) &&
        (mapArray[2][column] != 0) && (mapArray[4][column] != 0) && (mapArray[2][column]) === (mapArray[4][column]) &&
        (mapArray[2][column] != 0) && (mapArray[5][column] != 0) && (mapArray[2][column]) === (mapArray[5][column])) {

        return true;
    } return false;
}
