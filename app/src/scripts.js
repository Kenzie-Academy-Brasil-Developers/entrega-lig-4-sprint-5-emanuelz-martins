const mainTable = document.querySelector('#main-container');
let mapArray = [
    [2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0],
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

let counter = 1

function diagonalVictory(arr) {

    if( upRightDownLeft(arr) === true ) {
        console.log("win for Up Right Down Left")
    }
    counter = 1

    if ( upLeftDownRight(arr) === true ) {
        console.log("win for Up Left Down Right")
    }
    counter = 1
}

function upRightDownLeft(arr){
    let check = [arr[0], arr[1]]

        if(check[0]>0){
            while(mapArray[check[0]][check[1]] === mapArray[check[0]-1][check[1]+1]){
                counter += 1
                check[0] += 1
                check[1] -= 1
                if(check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                    break;
                }
            }
        }

    check = [arr[0], arr[1]]

    if(check[0]<5){
        while(mapArray[check[0]][check[1]] === mapArray[check[0]+1][check[1]-1]){
            counter += 1
            check[0] += 1
            check[1] -= 1
            if(check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                break;
            }
        }
    }

    if(counter === 4){
        return true
    } else {
        return false
    }
}

function upLeftDownRight(arr){
    let check = [arr[0], arr[1]]

    if(check[0]>0){
        while(mapArray[check[0]][check[1]] === mapArray[check[0]-1][check[1]-1]){
            counter += 1
            check[0] -= 1
            check[1] -= 1
            if(check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                break;
            }
        }
    }

    check = [arr[0], arr[1]]

    if(check[0] < 5){
        while(mapArray[check[0]][check[1]] === mapArray[check[0]+1][check[1]+1]){
            counter += 1
            check[0] += 1
            check[1] += 1
            if(check[0] === 0 || check[0] === 5 || check[1] === 0 || check[1] === 6) {
                break;
            }
        }
    }

    if(counter === 4){
        return true
    } else {
        return false
    }
}