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

    let whichMark = (player1, player2) => {
        let player1 = player1Input.checked;
        let player2 = player2Input.checked;
        if (player1 === true) {
            console.log('player one is ai, and will have an X for mark')
            return aiPlayerMark = 'X';
        } else if (player2 === true) {
            console.log('player two is ai, and will have an O for mark')
            return aiPlayerMark = 'O';
        }
    }; 

    const createAiPlayer = () => {

    };

}