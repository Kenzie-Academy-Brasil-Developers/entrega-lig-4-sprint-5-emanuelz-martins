const mainTable = document.querySelector('#main-container');
const mapArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

let diskCount = 0;
let match = false;

function createTable() {
    for (let row = 0; row < mapArray.length; row++) {
        const tableRow = document.createElement('div');
        tableRow.classList.add('row');
        
        for (let column = 0; column < mapArray[row].length; column++) {
            const tableColumn = document.createElement('div');
            tableColumn.classList.add('column');      
            
            tableRow.appendChild(tableColumn);
        }

        mainTable.appendChild(tableRow);
    }
}

createTable();
