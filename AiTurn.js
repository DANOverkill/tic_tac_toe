// Ai Player Logic 

import GameBoard from "./GameBoard.js";
import Player from "./Player.js";
import GameControl from "./GameControl.js";

const AiTurn = (() => {
    
    let gameBoard = GameBoard.getBoard();
    let mark = game.getCurrentPlayer().getMark(); 

    let getConsoleLog = () => {
        console.log(gameBoard,mark)
    };    
    

    return {getConsoleLog}
});

export default AiTurn;
