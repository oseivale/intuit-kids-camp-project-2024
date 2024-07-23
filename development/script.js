// script.js
document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");
    const character = document.getElementById("character");
    const gameOverDisplay = document.getElementById("gameOverUI");
    const youWinDisplay = document.getElementById("winUI");
    const restartButton = document.getElementById("restart");
    const finishLine = document
      .getElementById("finishLine")
      .getBoundingClientRect();
    
    let characterPositionX = 0;
    let characterPositionY = 0;
    let gameRunning = true;
  
    function moveCharacter(dx, dy) {
      if (!gameRunning) return;
      characterPositionX += dx;
      characterPositionY += dy;
      character.style.transform = `translate(${characterPositionX}px, ${characterPositionY}px)`;
      checkWinCondition();
    }
  
    // Restart Function & Event Listener
  
    function handleKeyDown(e) {
      if (!gameRunning) return;
      switch (e.key) {
        case "ArrowRight":
          moveCharacter(10, 0); // move right
          break;
        case "ArrowLeft":
          moveCharacter(-10, 0); // move left
          break;
        case "ArrowUp":
          moveCharacter(0, -10); // move up
          break;
        case "ArrowDown":
          moveCharacter(0, 10); // move down
          break;
      }
      character.classList.add("running");
      setTimeout(() => character.classList.remove("running"), 500);
    }
  
    document.addEventListener("keydown", handleKeyDown);
  
    function createFireBall() {
      const fireBall = document.createElement("div");
      fireBall.className = "fireBall";
      fireBall.style.left = `${Math.random() * (gameArea.offsetWidth - 30)}px`;
      gameArea.appendChild(fireBall);
  
      const fireBallInterval = setInterval(() => {
        const fireBallRect = fireBall.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();
  
        if (
          fireBallRect.x < characterRect.x + characterRect.width &&
          fireBallRect.x + fireBallRect.width > characterRect.x &&
          fireBallRect.y < characterRect.y + characterRect.height &&
          fireBallRect.height + fireBallRect.y > characterRect.y
        ) {
          character.classList.add("hit");
          clearInterval(fireBallInterval);
          endGame("lose");
        }
      }, 50);
  
      setTimeout(() => {
        clearInterval(fireBallInterval);
        gameArea.removeChild(fireBall);
      }, 3000);
    }
  
    function checkWinCondition() {
      const characterRect = character.getBoundingClientRect();
      if (characterRect.right >= finishLine.left) {
        endGame("win");
      }
    }
  
    // End Game Function
  
    setInterval(() => {
      if (gameRunning) {
        createFireBall();
      }
    }, 1000);
  });