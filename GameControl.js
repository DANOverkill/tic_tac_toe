import GameBoard from "./GameBoard.js";
import Player from "./Player.js";

const GameControl = ((player1Input, player1IsAI, player2Input, player2IsAI) => {

   //createPlayer1 and createPlayer2 functions not working as intended yet. 
    const createPlayer1 = () => {
        let playerOneName;

        if (player1Input.trim() === '') {
            playerOneName = 'Player 1';
        } else if (player1Input.trim()){
            playerOneName = player1Input.trim();
        }
        return Player(playerOneName, 'X', player1IsAI);
    }    
    const createPlayer2 = () => {
        let playerTwoName;

        if (player2Input.trim() === '') {
            playerTwoName = 'Player 2';
        } else if (player2Input.trim()){
            playerTwoName = player2Input.trim();
        }
        return Player(playerTwoName, 'O', player2IsAI);
    } 

    let playerOne = createPlayer1();
    let playerTwo = createPlayer2();

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