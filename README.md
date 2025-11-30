# Tic Tac Toe — JavaScript Project

A modular Tic Tac Toe game built in vanilla JavaScript using ES modules. The project includes player vs. AI gameplay, AI turn logic, tie/win detection, responsive UI updates, and clean separation of concerns across multiple modules.

---

## 🚀 Features

* **Modular Architecture**

  * `GameBoard.js` manages board array states
  * `Player.js` creates player objects (human + AI)
  * `GameControl.js` orchestrates turns, win/tie checking, and round flow
  * `AiTurn.js` handles AI decision-making - currently only handles only random choices

* **AI Logic**

  * Random-move AI with built-in tie/win detection
  * AI turn delay support (`aiIsThinking` flag) to prevent multi-click issues

* **Win/Tie Detection**

  * Game properly displays messages and spawns a **Next Round** button
  * Prevents further interaction when a round is over

* **DOM Interaction Fixes**

  * Correct checks for UI elements (e.g., `document.getElementById('nextRound')`)
  * Prevents AI or player moves after game end

* **Import/Export Stability**

  * Project uses explicit file extensions (`import X from './X.js'`)
  * Fixed corruption errors due to missing extensions

* **Git Workflow Improvements**

  * Branch cleanup instructions (`git branch -d`, `git push origin --delete`)

---

## 📦 File Structure

```
/project
  ├── GameBoard.js
  ├── GameControl.js
  ├── Player.js
  ├── AiTurn.js
  ├── index.html
  ├── styles.css
  └── README.md
```

---

## 🧠 AI Turn Flow

1. Board click triggers player move
2. `aiIsThinking` becomes true
3. AI evaluates board
4. AI returns one of:

   * `continue` → Game continues
   * `tie` → Display tie message + Next Round
   * `win` → Display win message + Next Round
5. `aiIsThinking` becomes false

---

## 🐛 Common Fixes in This Project

* **Event listener firing multiple times** → resolved by guarding with flags
* **Tie detection not triggering UI** → fixed by hooking into return values
* **Next Round button reappearing incorrectly** → fixed via DOM existence checks

---

## 🧪 Debugging Tools Used

* Console logs during AI turn flow
* Step-by-step evaluation for tie/win detection
* Verification that modules are loading correctly in live server

---

## 🔧 Setup & Running

1. Clone the repo
2. Serve the project using Live Server or any static server
3. Open `index.html` in the browser

> **Note:** Modules require HTTP(s); opening the file directly without a server will not work.

---

## ✨ Next Steps (Optional Improvements)

* Smarter AI (minimax)
* Scoreboard persistence
* Animations for moves
* Mobile-friendly layout improvements

---

## 📚 Summary

This project was built while experimenting with modular JavaScript, AI move logic, and debugging DOM/game flow issues. It demonstrates clean structure, incremental improvements, and refining gameplay interactions until everything worked smoothly.
