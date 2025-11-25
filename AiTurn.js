// Ai Player Logic 

import GameBoard from "./GameBoard";
import Player from "./Player";
import GameControl from "./GameControl";

const AiTurn = () => {
    
    let gameBoard = GameBoard.getBoard();
    
    // this still needs to be added to GameControl
    let mark = GameControl.getAiPlayer().getMark(); 



};

export default AiTurn;
















/*
the aiPlayer idea was getting to convoluted. I think GameControl can 
handle player marks and player names already. No need for that to also 
be handled in here. 
Instead I will have aiPlayer() instead be called AiTurn(GameBoard().getBoard(), mark), 
and I will have it take only 2 arguments, GameBoard().getBoard() and the mark of the
player its assigned to.
*/

function aiPlayer() {
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
            console.log('player one is ai, and will have an X for mark');
            return aiPlayerMark = 'X';
        } else if (player2 === true) {
            console.log('player two is ai, and will have an O for mark');
            return aiPlayerMark = 'O';
        }
    };

    const createAiPlayer = () => {
    };

}