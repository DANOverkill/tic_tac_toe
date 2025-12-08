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

// == original minmax logic ===//

// gameCurrent argument seems to be the gameBoard argument the factory takes in

const miniMax = (gameCurrent, player, depth) => {
	const min = (a, b) => {
		return a < b ? a : b;
	}
	
	const max = (a, b) => {
		return a > b ? a : b;
	}

    let empty = emptyCells(gameCurrent); //boardEmptyCells already does this

    if (checkWinner(gameCurrent, humanPlayer)) {
        return { score: -1 };
    }
    if (checkWinner(gameCurrent, computerPlayer)) {
        return { score: 1 };
    }
    if (empty.length === 0 || depth === 0) {
        return { score: 0 };
    }
    
    depth--;

    let movePossibles = [];

    for (let i = 0; i < empty.length; i++) {
        let move = {};
        move.index = empty[i];

        let newGame = gameCurrent.slice();
        newGame[empty[i]] = player;

		let result = miniMax(newGame, player === computerPlayer ? humanPlayer : computerPlayer, depth);
        move.score = result.score;
        movePossibles.push(move);
    }

	let bestMove;	
    if (player === computerPlayer) {
        bestScore = -Infinity;
        for (let i = 0; i < movePossibles.length; i++) {
            bestScore = max(bestScore, movePossibles[i].score);
            if (movePossibles[i].score === bestScore) {
				bestMove = i;
            }
        }
    } else {
        bestScore = Infinity;
        for (let i = 0; i < movePossibles.length; i++) {
            bestScore = min(bestScore, movePossibles[i].score);
            if (movePossibles[i].score === bestScore) {
				bestMove = i;
            }
        }
    }

    return movePossibles[bestMove];
}