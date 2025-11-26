// Ai Player Logic 

import GameBoard from "./GameBoard.js";
import Player from "./Player.js";
import GameControl from "./GameControl.js";

const AiTurn = (mark, gameBoard) => {

    let getConsoleLog = () => {
        console.log(mark,gameBoard);
    };    
    

    return {getConsoleLog};
};

export default AiTurn;
