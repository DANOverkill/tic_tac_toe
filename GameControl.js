import GameBoard from "./GameBoard.js";
import Player from "./Player.js";

const GameControl = ((player1Input, player1IsAI, player2Input, player2IsAI) => {

   //createPlayer1 and createPlayer2 functions not working as intended yet. 
    const createPlayer1 = (player1Input, player1IsAI) => {
        let playerOne;

        if (playerOne === player1Input + false) {
            return playerOne = Player(player1Input, 'X', false);
        } else if (playerOne === player1Input + true){
            return playerOne = Player(player1Input, 'X', true);
        } else if (playerOne === '' + true){
            return playerOne = Player('Player 1', 'X', true);
        }
    }
    const createPlayer2 = (player2Input, player2IsAI) => {
        let playerTwo;

        if (playerTwo === player2Input + false) {
            return playerOne = Player(player2Input, 'X', false);
        } else if (playerOne === player2Input + true){
            return playerOne = Player(player2Input, 'X', true);
        } else if (playerOne === '' + true){
            return playerOne = Player('Player 1', 'X', true);
        }
    }

    let playerOne = createPlayer1;
    let playerTwo = createPlayer2;

    let currentPlayer = playerOne; 
    let wonRound = '';

    const getCurrentPlayer = () => currentPlayer;
    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;

    const switchTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    //check for players marked indexes on the board
    const getPlayerIndexes = (mark) => {
        const board = GameBoard.getBoard();
        const indexes = [];

        for (let i = 0; i < board.length; i++) {
            const cell = board[i];
            if (cell === mark) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    //win condition check
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal (top-left to bottom-right)
        [2, 4, 6]  // Diagonal (top-right to bottom-left)
    ];
    
    const checkWin = (playerIndex) => {
        for (let i = 0; i < winPatterns.length; i++) {
            const pattern = winPatterns[i];

            let hasAllIndexes = true;

            for (let j = 0; j < pattern.length; j++) {
                const index = pattern[j];
                if (!playerIndex.includes(index)) {
                    hasAllIndexes = false;
                    break;
                }
            }
            if (hasAllIndexes === true) {
                currentPlayer.addPoint;
                return true;
            } 
            
        } 
        return false;
    };

    //round logic
    const playTurn = (index) => {
        GameBoard.setMark(index, currentPlayer.getMark());

        if (checkWin(getPlayerIndexes(currentPlayer.getMark()))) {
            console.log(`${currentPlayer.getName()} wins!`);
            currentPlayer.addPoint();
            return wonRound = 'win';
        }else if (!GameBoard.getBoard().includes("") && !checkWin(getPlayerIndexes(currentPlayer.getMark()))) {
            console.log(`${currentPlayer.getName()} it's a tie!`);
            return wonRound = 'tie';
        } else {
            console.log(`${currentPlayer.getName()} played turn`); // visualizing player name for testing
            console.log(currentPlayer.getPoints());
            switchTurn();
            console.log(GameBoard.getBoard()); //added console log for testing while we have no UI
            return wonRound = 'continue';
        }
    };

    return {playTurn, getPlayerIndexes, getCurrentPlayer, getPlayerOne, getPlayerTwo};

});

export default GameControl;