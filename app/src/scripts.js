const mainTable = document.querySelector('#main-container');
const mapArray = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];
const columns = document.querySelectorAll('.column');
const rows = document.querySelectorAll('.row');
let lastIndex = Number;

let diskCount = 0;
let match = false;

function createTable() {
    for (let column = 0; column < mapArray.length; column++) {
        const tableColumn = document.createElement('div');
        tableColumn.classList.add('column');      
        
        for (let row = 0; row < mapArray[column].length; row++) {
            const tableRow = document.createElement('div');
            tableRow.classList.add('row');

            tableColumn.appendChild(tableRow);
        }

        mainTable.appendChild(tableColumn);
    }
}

function boardMoves (index) {

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
                diskCount++
                break;
            } 
            else if (numberOfSpaces === 0 && match === true) {
                freeSpace.appendChild(redBall);
                mapArray[i][index] = 2;
                match = false;
                lastIndex = i;
                diskCount++
                break;
            }
        }
    //  CHAMAR VERIFICAÇÃO DE VITÓRIA (INDEX);
}

createTable();
