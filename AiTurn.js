// Ai Player Logic 

import GameBoard from "./GameBoard.js";
import Player from "./Player.js";
import GameControl from "./GameControl.js";

const AiTurn = (mark, gameBoard) => {

    const boardEmptyCells = (gameBoard) => {
        const board = gameBoard;
        const emptyCells = [];

        for (let i = 0; i < board.length; i++) {
            const cell = board[i];
            if (cell === '') {
                emptyCells.push(i);
            }
        }
        return emptyCells;
    } 
    
    const aiChoice = (mark, gameBoard) => {
        let options = boardEmptyCells(gameBoard);
        
        const randomAiChoiceIndex = Math.floor(Math.random() * options.length);
        const chosenIndex = options[randomAiChoiceIndex];
        
        return chosenIndex;
    };

    return {aiChoice};
}


export default AiTurn;
