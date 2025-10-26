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

    return { setMark, getBoard, resetBoard }; 

})();

export default GameBoard;

