/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Game Scene
 * @license      Digitsensitive
 */
import { socket } from './../../shared/socket';
import { Coin } from "../objects/coin";
import { Player } from "../objects/player";
import { ServerPlayer } from '../../shared/models';

export class GameScene extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private coin: Coin;
  private player: Player;
  private otherPlayers: Player[] = [];

  private collectedCoins: number = 0;
  private coinsCollectedText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.image("background", "./assets/coin-runner/background.png");
    this.load.image("player", "./assets/coin-runner/player.png");
    this.load.image("coin", "./assets/coin-runner/coin.png");
  }

  create(): void {
    // create background
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    // create objects
    this.coin = new Coin({
      scene: this,
      x: Phaser.Math.RND.integerInRange(100, 700),
      y: Phaser.Math.RND.integerInRange(100, 500),
      key: "coin"
    });
    this.player = new Player(this, 150, 300, "player", 0);

    // create texts
    this.coinsCollectedText = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height - 50,
      this.collectedCoins + "",
      {
        fontFamily: "Connection",
        fontSize: 38,
        stroke: "#fff",
        strokeThickness: 6,
        fill: "#000000"
      }
    );

    socket.on('playerMoved', (playerInfo: ServerPlayer) => {
        this.player.move(playerInfo.x, playerInfo.y);
        this.player.setRotation(playerInfo.rotation)
    });

    socket.on('newPlayer', (playerInfo: ServerPlayer) => {
      this.addOtherPlayer(playerInfo);
  });
  }

  update(): void {
    // update player and coin
    this.player.update();
    this.coin.update();

    // do the collision check
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.player.getBounds(),
        this.coin.getBounds()
      )
    ) {
      this.updateCoinStatus();
    }
  }

  private addOtherPlayer(player: ServerPlayer) {
    const otherPlayer = new Player(this, player.x, player.y, 'player', player.id);
    otherPlayer.setOrigin(0.5, 0.5);
    otherPlayer.setDisplaySize(75, 75);;
    if (player.team === 'blue') {
        otherPlayer.setTint(0x0000ff);
    } else {
        otherPlayer.setTint(0xff0000);
    }
    otherPlayer.id = player.id;
    this.otherPlayers[player.id] = otherPlayer;
  }

  private updateCoinStatus(): void {
    this.collectedCoins++;
    this.coinsCollectedText.setText(this.collectedCoins + "");
    this.coin.changePosition();
  }

  private gameover(): void {
    this.scene.start("GameScene");
  }
}
