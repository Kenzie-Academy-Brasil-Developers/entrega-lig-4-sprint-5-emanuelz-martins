for (let i = 0; i < colunas.length; i++) {
    colunas[i].addEventListener("click", evento => {
        boardMoves(i);
    });
}