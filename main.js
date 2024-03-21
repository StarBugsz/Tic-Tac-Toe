"use strict"; 

document.addEventListener("DOMContentLoaded", function () {
  const feldList = document.getElementsByClassName("feld");
  const player1 = document.querySelector(".player1");
  const player2 = document.querySelector(".player2");
  let counter = 0;

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

  // Schleife um alle Felder anzusteuern
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

  function randomnumber() {
    setTimeout(function() {
      let zufallszahl = Math.floor(Math.random() * 9) + 1;
      console.log("Zufällige Zahl nach 2 Sekunden Verzögerung: " + zufallszahl);
    }, 2000); // 2000 Millisekunden entsprechen 2 Sekunden
  }
  
});
