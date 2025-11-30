# Tic Tac Toe — JavaScript Project

A modular Tic Tac Toe game built in vanilla JavaScript using ES modules. The project includes player vs. AI gameplay, AI turn logic, tie/win detection, responsive UI updates, and clean separation of concerns across multiple modules.

---

## Features

* **Modular Architecture**

  * `main.js` manages UI integration with logic
  * `GameBoard.js` manages board array states
  * `Player.js` creates player objects (human + AI)
  * `GameControl.js` orchestrates turns, win/tie checking, and round flow
  * `AiTurn.js` handles AI decision-making - currently only handles only random choices

* **AI Logic**

  * Random-move AI with built-in tie/win detection
  * AI turn delay support (`aiIsThinking` flag) for better use experience

* **Win/Tie Detection**

  * Game properly displays messages and spawns a **Next Round** button
  * Prevents further interaction when a round is over

---

## File Structure

```
/project
  ├── main.js
  ├── GameBoard.js
  ├── GameControl.js
  ├── Player.js
  ├── AiTurn.js
  ├── index.html
  ├── styles.css
  └── README.md
```

---

## AI Turn Flow

1. Board click triggers player move
2. `aiIsThinking` becomes true
3. AI evaluates board
4. AI returns one of:

   * `continue` → Game continues
   * `tie` → Display tie message + Next Round
   * `win` → Display win message + Next Round
5. `aiIsThinking` becomes false

---

## Next Steps (Optional Improvements)

* Smarter AI (write proper ai logic for tic tac toe)
* Scoreboard persistence: keeping track of points for a best of style game
* Animations for moves
* Mobile-friendly layout improvements

## Known issues.

1. Player turn indication on the Score Board does not work properly. 
    * For the first 2 rounds of a match procedding a mach that comes right after the Ai player ties or wins the previous match, the player turn indicator freeses on the Ai player.
    * Once the human player, plays his turn, the function returns to working properly. 
    * The issue is most likely happening due to the fuction writeAiRandomMark() running asynchronously.  

---

## 📚 Summary

This project was built while experimenting with modular JavaScript. It demonstrates an atempt to create a clean structure that separate responsabilitied between differnt logic files to creat a structure that allows for scaling and incremental improvements.
