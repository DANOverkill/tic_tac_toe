// Ai Player Logic 

import GameBoard from "./GameBoard";
import Player from "./Player";

const aiPlayer = () => {
    const board = GameBoard.getBoard();

    /* I'm going to add a check so that if we toggle player 1 for Ai 
    then we get a "X" mark, and if we toggle player 2 for Ai, then we 
    would get a "O" mark
    */
    const aiPlayer = Player(aiPlayerName, aiPlayerMark);

    let aiPlayerMark; 

    let whichMark = () => {
        // logic for checking 
    }; 
}