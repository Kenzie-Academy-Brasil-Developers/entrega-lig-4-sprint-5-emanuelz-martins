// let match = false; //variável para mudança de jogador; preto === true
//                                                     vermelho === false
// let diskCount = 0; //variável para o número de bolotas no tabuleiro
// const mapArray = [
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0]
// ];

const columns = document.querySelectorAll('.column');
const rows = document.querySelectorAll('.row');
let lastIndex = Number;
// verificar array, inserir bolotas e incrementar contagem 
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
