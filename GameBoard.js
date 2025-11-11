const GameBoard = (() => {

    let board = Array(9).fill('');

    const setMark = (index, mark) => {
        if (board[index] === '') {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const getBoard = () => [...board];

    const resetBoard = () => {
        board = Array(9).fill('');
    }

    
    const createBoardUI = () => {
        const board = document.querySelector('#board');
        board.innerHTML = '';

        for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
        }
    };


    return { setMark, getBoard, resetBoard, createBoardUI }; 

})();

export default GameBoard;

