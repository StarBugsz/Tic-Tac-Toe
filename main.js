"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const feldList = document.getElementsByClassName("feld");
  const player1 = document.querySelector(".player1");
  const player2 = document.querySelector(".player2");
  const bot_button = document.querySelector(".bot_button");
  const player_button = document.querySelector(".player_button");
  let counter = 0;
  let isBotTurn = true;

  const winCombinations = [
    [0, 1, 2], // Horizontal oben
    [3, 4, 5], // Horizontal mitte
    [6, 7, 8], // Horizontal unten
    [0, 3, 6], // Vertikal links
    [1, 4, 7], // Vertikal mitte
    [2, 5, 8], // Vertikal rechts
    [0, 4, 8], // Diagonal links oben nach rechts unten
    [2, 4, 6], // Diagonal rechts oben nach links unten
  ];
  const playerMoves = {
    comboplayer1: [],
    comboplayer2: [],
  };

  const checkWin = (playerMoves, currentPlayer) => {
    return winCombinations.some((combination) =>
      combination.every((cell) => playerMoves[currentPlayer].includes(cell))
    );
  };

  bot_button.addEventListener("click", () => {
    // Hier wird das Spiel gegen den Bot gestartet
    bot_button.classList.add("clicked");
    TicTacToeagainstBot();
  });

  function botPlay() {
    // Zufälliger Zug des Bots nach einer Verzögerung von 2 Sekunden
    setTimeout(function () {
      // Überprüfen, ob das Spiel bereits gewonnen wurde
      if (!checkWin(playerMoves, "comboplayer2")) {
        const emptyCells = Array.from(feldList).filter(
          (cell) => !cell.querySelector("i")
        );
        const randomCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const randomIndex = Array.from(feldList).indexOf(randomCell);
        if (randomIndex !== -1) {
          const element = document.createElement("i");
          element.className = "bx bx-cross";
          randomCell.appendChild(element);
          playerMoves.comboplayer2.push(randomIndex);
          checkWinAndAlert("comboplayer2", "Spieler 2");
          counter++;
          // Ruf botPlay erneut auf, um den nächsten Botzug zu starten
        }
      }
    }, 2000); // Zeitverzögerung von 2 Sekunden
  }

  player_button.addEventListener("click", () => {
    // Hier wird das Spiel gegen einen menschlichen Spieler gestartet
    TicTacToe();
    player_button.classList.add("clicked");
  });

  // Schleife um alle Felder anzusteuern
  async function TicTacToe() {
    for (let i = 0; i < feldList.length; i++) {
      feldList[i].addEventListener("click", () => {
        // Überprüfen, ob das Element bereits ein Kind (Icon) hat
        if (feldList[i].querySelector("i") === null) {
          const element = document.createElement("i");
          if (counter % 2 === 0) {
            element.className = "bx bx-radio-circle";
            player1.classList.remove("player1");
            player1.classList.add("player2");
            player2.classList.add("player1");
            playerMoves.comboplayer1.push(i);
            checkWinAndAlert("comboplayer1", "Spieler 1");
            // Nach jedem Zug des Spielers, führe den Zug des Bots aus
            botPlay(); // Aufruf der Bot-Funktion
          } else {
            element.className = "bx bx-cross";
            player2.classList.remove("player1");
            player2.classList.add("player2");
            player1.classList.add("player1");
            playerMoves.comboplayer2.push(i);
            checkWinAndAlert("comboplayer2", "Spieler 2");
          }
          feldList[i].appendChild(element);
          counter++;
          //console.log(feldList[i]);
          console.log(playerMoves.comboplayer1);
        }
      });
    }
  }
  function checkWinAndAlert(currentPlayerKey, playerName) {
    // Spieler prüfen
    const playerWins = checkWin(playerMoves, currentPlayerKey);
    if (playerWins) {
      alert(`${playerName} hat gewonnen!`);
      // Optional: Hier könntest du das Spiel zurücksetzen oder weitere Aktionen durchführen.
    } else {
      console.log(`${playerName} hat noch nicht gewonnen.`);
    }
  }
  async function TicTacToeagainstBot() {
    for (let i = 0; i < feldList.length; i++) {
      feldList[i].addEventListener("click", () => {
        // Überprüfen, ob das Element bereits ein Kind (Icon) hat
        if (feldList[i].querySelector("i") === null) {
          const element = document.createElement("i");
          if (counter % 2 === 0) {
            element.className = "bx bx-radio-circle";
            player1.classList.remove("player1");
            player1.classList.add("player2");
            player2.classList.add("player1");
            playerMoves.comboplayer1.push(i);
            checkWinAndAlert("comboplayer1", "Spieler 1");
            // Nach jedem Zug des Spielers, führe den Zug des Bots aus
            botPlay(); // Aufruf der Bot-Funktion
          } else {
            element.className = "bx bx-cross";
            player2.classList.remove("player1");
            player2.classList.add("player2");
            player1.classList.add("player1");
            playerMoves.comboplayer2.push(i);
            checkWinAndAlert("comboplayer2", "Spieler 2");
          }
          feldList[i].appendChild(element);
          counter++;
          //console.log(feldList[i]);
          console.log(playerMoves.comboplayer1);
        }
      });
    }
  }
});
