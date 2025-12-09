// Ai Player Logic 

import GameBoard from "./GameBoard.js";
import Player from "./Player.js";
import GameControl from "./GameControl.js";

const AiTurn = (aiCheck, mark, gameBoard) => {
    
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
    
    const aiRandomChoice = () => {
        if (!aiCheck){
            return;
        } else {
            let options = boardEmptyCells(gameBoard);
            
            const randomAiChoiceIndex = Math.floor(Math.random() * options.length);
            const chosenIndex = options[randomAiChoiceIndex];
            
            return chosenIndex;
        }

    };

    const getAiMark = () => {
        if (!aiCheck) {
            return;
        } else {
            return mark;
        }
    }

    return {aiRandomChoice, getAiMark};
}


export default AiTurn;
