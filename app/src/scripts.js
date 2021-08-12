let intro = document.querySelector(".intro");
window.addEventListener("load", event => {
    intro.autoplay = true;
    intro.volume = 0.02;
    intro.play();
});
let introStart = document.querySelector(".introStart");
let drawSound = document.querySelector(".drawSound");
let winnerSound = document.querySelector(".winnerSound");
let backgroundSound = document.querySelector(".backgroundSound");
let fallSound = document.querySelector(".fallSound");

const mainTable = document.querySelector('.main-container');
const columns = document.getElementsByClassName('column');
const rows = document.getElementsByClassName('row');
const arrow = document.querySelector('#indicator-arrow-right');
const startButton = document.querySelector(".startButton");
const titleImage = document.querySelector(".titleImage");
const buttonsDiv = document.querySelector(".buttons");
const redWin = document.querySelector(".buttons__redWins");
const greenWin = document.querySelector(".buttons__greenWins");
const drawWins = document.querySelector(".buttons__draw");
const banner = document.querySelector('#player-banner');
let restartButton = document.querySelectorAll(".restartButton");
let mapArray = [
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

startButton.addEventListener("click", () => {
    mainTable.classList.remove("hidden")
    startButton.classList.add("hidden")
    banner.classList.remove('hidden');
    titleImage.style.width = "50vw";
    intro.pause();
    introStart.volume = 0.04;
    introStart.play();
    backgroundSound.play();
    backgroundSound.volume = 0.01;
});

for (let loop = 0; loop < 3; loop++) {
    restartButton[loop].addEventListener("click", () => {
        location.reload()
    })
}

for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener("click", event => {
        let columnsArray = [...columns];
        let currentTarget = event.currentTarget;
        let index = columnsArray.findIndex((element) => element === currentTarget);
        togglePlayerSelection(match);
        boardMoves(index);
        fallSound.play();
        diagonalVictory(coords);
        crossWins(coords);
        if (draw === 42) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                drawWins.classList.remove("hidden")
                backgroundSound.pause();
                drawSound.volume = 0.03;
                drawSound.play();
            }, 200)
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
            draw += 1
            break;
        }
        else if (numberOfSpaces === 0 && match === true) {
            freeSpace.appendChild(redBall);
            mapArray[i][index] = 2;
            match = false;
            lastIndex = i;
            diskCount++;
            coords = [i, index];
            draw += 1
            break;
        }
    }
}

function togglePlayerSelection(match) {
    if (match == false) {
        arrow.classList.replace('left', 'right');
    }

    if (match) {
        arrow.classList.replace('right', 'left');
    }
}

function diagonalVictory(arr) {

    if (upRightDownLeft(arr) === true) {
        if (mapArray[arr[0]][arr[1]] === 1) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                redWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                greenWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
        }
    }
    counter = 1;

    if (upLeftDownRight(arr) === true) {
        if (mapArray[arr[0]][arr[1]] === 1) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                redWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                greenWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
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
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                redWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                greenWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
        }
    }

    if (verticalWins(arr) === true) {
        if (mapArray[arr[0]][arr[1]] === 1) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                redWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
        } else if (mapArray[arr[0]][arr[1]] === 2) {
            setTimeout(() => {
                buttonsDiv.classList.remove("hidden")
                greenWin.classList.remove("hidden")
                winnerSound.play();
            }, 300)
        }
    }
}

if (verticalWins(arr) === true) {
    if (mapArray[arr[0]][arr[1]] === 1) {
        setTimeout(() => {
            buttonsDiv.classList.remove("hidden")
            redWin.classList.remove("hidden")
        }, 300)
    } else if (mapArray[arr[0]][arr[1]] === 2) {
        setTimeout(() => {
            buttonsDiv.classList.remove("hidden")
            greenWin.classList.remove("hidden")
        }, 300)
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
