import GameBoard from "./GameBoard.js";
import Player from "./Player.js";

const GameControl = (() => {
    const playerOneName = prompt('Please enter Name for Player 1:');
    const playerTwoName = prompt('Please enter Name for Player 2:');

    const playerOne = Player(playerOneName || 'Player 1', 'X');
    const playerTwo = Player(playerTwoName || 'Player 2', 'O');

    let currentPlayer = playerOne; 

    const switchTurn = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const playTurn = (index) => {
        GameBoard.setMark(index, currentPlayer.getMark());
        switchTurn();
        console.log(GameBoard.getBoard()); //added console log for testing while we have no UI
    };

    return {playTurn};

})();

export default GameControl;