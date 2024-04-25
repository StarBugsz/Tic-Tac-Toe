"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const feldList = document.getElementsByClassName("feld");
  const player1 = document.querySelector(".player1");
  const player2 = document.querySelector(".player2");
  const bot_button = document.querySelector(".bot_button");
  const player_button = document.querySelector(".player_button");
  const turn_button1 = document.querySelector(".turn_button1");
  const turn_button2 = document.querySelector(".turn_button2");

  let counter;

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

  function checkWinAndAlert(currentPlayerKey, playerName) {
    // Spieler prüfen
    const playerWins = checkWin(playerMoves, currentPlayerKey);
    if (playerWins) {
      alert(`${playerName} hat gewonnen!`);
      window.location.reload();
      // Optional: Hier könnte man das Spiel zurücksetzen oder weitere Aktionen durchführen.
    } else {
      console.log(`${playerName} hat noch nicht gewonnen.`);
    }
  }

  bot_button.addEventListener("click", () => {
    // Hier wird das Spiel gegen den Bot gestartet
    bot_button.classList.add("clicked");
    turn_button1.addEventListener("click", () => {
      turn_button1.classList.add("clicked");
      counter = 0;
    });
    turn_button2.addEventListener("click", () => {
      turn_button2.classList.add("clicked");
      counter = 1;
      botPlay();
    });
    TicTacToeagainstBot();
  });

  function botPlay() {
    // Zufälliger Zug des Bots nach einer Verzögerung von 2 Sekunden
    setTimeout(function () {
      // Überprüfen, ob das Spiel bereits gewonnen wurde
      if (
        !checkWin(playerMoves, "comboplayer2") ||
        !checkWin(playerMoves, "comboplayer1")
      ) {
        const emptyCells = Array.from(feldList).filter(
          (cell) => !cell.querySelector("i")
        );
        const randomCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const randomIndex = Array.from(feldList).indexOf(randomCell);
        if (counter % 2 === 0) {
          const element = document.createElement("i");
          element.className = "bx bx-radio-circle";
          randomCell.appendChild(element);
          player1.classList.remove("player1");
          player1.classList.add("player2");
          player2.classList.add("player1");
          playerMoves.comboplayer1.push(randomIndex);
        } else {
          const element = document.createElement("i");
          element.className = "bx bx-cross";
          randomCell.appendChild(element);
          player2.classList.remove("player1");
          player2.classList.add("player2");
          player1.classList.add("player1");
          playerMoves.comboplayer2.push(randomIndex);
        }
        if (counter === 1) {
          player1.classList.remove("player1");
          player1.classList.add("player2");
          player2.classList.add("player1");
        }
        counter++;
        
        checkWinAndAlert("comboplayer1", "Spieler 1");
        checkWinAndAlert("comboplayer2", "Spieler 2");
      }
    }, 2000); // Zeitverzögerung von 2 Sekunden
  }

  player_button.addEventListener("click", () => {
    // Hier wird das Spiel gegen einen menschlichen Spieler gestartet
    counter = 0;
    TicTacToe();
    player_button.classList.add("clicked");
    console.log(counter);
  });

  // Schleife um alle Felder anzusteuern
  function TicTacToe() {
    for (let i = 0; i < feldList.length; i++) {
      feldList[i].addEventListener("click", () => {
        // Überprüfen, ob das Element bereits ein Kind (Icon) hat
        if (feldList[i].querySelector("i") === null) {
          const element = document.createElement("i");
          if (counter % 2 === 0) {
            element.className = "bx bx-cross";
            player1.classList.remove("player1");
            player1.classList.add("player2");
            player2.classList.add("player1");
            playerMoves.comboplayer1.push(i);
            console.log(playerMoves.comboplayer1);
          } else {
            element.className = "bx bx-radio-circle";
            player2.classList.remove("player1");
            player2.classList.add("player2");
            player1.classList.add("player1");
            playerMoves.comboplayer2.push(i);
            console.log(playerMoves.comboplayer2);
          }
          feldList[i].appendChild(element);
          counter++;
          checkWinAndAlert("comboplayer1", "Spieler 1");
          checkWinAndAlert("comboplayer2", "Spieler 2");
        }
      });
    }
  }

  function TicTacToeagainstBot() {
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
            // Nach jedem Zug des Spielers, führe den Zug des Bots aus
            botPlay();
          } else {
            element.className = "bx bx-cross";
            player2.classList.remove("player1");
            player2.classList.add("player2");
            player1.classList.add("player1");
            playerMoves.comboplayer2.push(i);
          }
          feldList[i].appendChild(element);
          counter++;
          console.log(counter);
          checkWinAndAlert("comboplayer1", "Spieler 1");
          checkWinAndAlert("comboplayer2", "Spieler 2");
        }
      });
    }
  }
});
