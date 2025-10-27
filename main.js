// import the APIs
import GameBoard from './GameBoard.js';
import Player from  './Player.js';
import GameControl from './GameControl.js';

// exposing GameBoard temporarily during dev and testing
window.GameBoard = GameBoard;
window.Player = Player;

window.GameControl = GameControl;