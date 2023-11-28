import { game } from "./game/game";
// import { Player } from "./game/player";

function startGame() {
  this.game = new game(); 
  // this.player = new Player(this.game)
}

document.addEventListener('DOMContentLoaded', startGame);
