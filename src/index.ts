import "phaser";
import { GameScene } from "./client/scenes/gameScene"
import { LoginScene } from "./client/scenes/login";

const config: GameConfig = {
  title: "Coin Runner",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.1",
  width: 768,
  height: 576,
  type: Phaser.AUTO,
  parent: "game",
  scene: [LoginScene, GameScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  backgroundColor: "#3A99D9"
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
