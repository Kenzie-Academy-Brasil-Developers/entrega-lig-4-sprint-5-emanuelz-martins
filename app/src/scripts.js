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

createTable();
