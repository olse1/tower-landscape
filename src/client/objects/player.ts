import { CONTROLS } from './../../shared/models';
/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */

import { socket } from './../../shared/socket';
import { PLAYER_CONFIG } from '../../shared/models';

export class Player extends Phaser.GameObjects.Image {
    private cursors: CursorKeys;
  
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
      super(scene, x, y, texture);
  
      this.initImage();
      this.initInput(scene);
  
      scene.add.existing(this);
    }
  
    private initImage(): void {
      this.setScale(0.8);
      this.setSize(40, 50);
      this.setAlpha(1);
      this.setFlip(false, false);
      this.setOrigin(0.4, 0.4);
      this.setAngle(0);
    }
    private initInput(scene: Phaser.Scene): void {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  
    update(): void {
      this.handleInput();
    }
  
    private handleInput(): void {
        let keys: CONTROLS = {
            WALK_LEFT: this.cursors.left.isDown,
            WALK_RIGHT: this.cursors.right.isDown,
            WALK_UP: this.cursors.up.isDown,
            WALK_DOWN: this.cursors.down.isDown
        };

        let movespeed = PLAYER_CONFIG.walkSpeed;
        let move = {
            x: 0,
            y: 0
        }
        
        if (keys.WALK_LEFT || keys.WALK_RIGHT || keys.WALK_UP || keys.WALK_DOWN) {
            socket.emit('playerKeys', keys);
        }

        if (keys.WALK_LEFT) {
            move.x -= movespeed;
        }
        if (keys.WALK_RIGHT) {
            move.x += movespeed;
        }
        if (keys.WALK_UP) {
            move.y -= movespeed;
        }
        if (keys.WALK_DOWN) {
            move.y += movespeed;
        }

        let newPosition = {
            x: this.x + move.x,
            y: this.y + move.y
        }

        this.move(newPosition.x, newPosition.y);
    }

    public move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
  