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
    private cursors: any;
    private walkingSpeed: number = 5;
  
    constructor(params) {
      super(params.scene, params.x, params.y, params.key);
  
      this.initImage();
      this.initInput(params);
  
      params.scene.add.existing(this);
    }
  
    private initImage(): void {
      this.setScale(0.8);
      this.setSize(40, 50);
      this.setAlpha(1);
      this.setFlip(false, false);
      this.setOrigin(0.4, 0.4);
      this.setAngle(0);
    }
    private initInput(params): void {
      this.cursors = params.scene.input.keyboard.createCursorKeys();
    }
  
    update(): void {
      this.handleInput();
    }
  
    private handleInput(): void {
        let keys: CONTROLS = {
            LEFT: this.cursors.LEFT.isDown,
            RIGHT: this.cursors.right.isDown,
            UP: this.cursors.up.isDown,
            DOWN: this.cursors.down.isDown
        };

        let movespeed = PLAYER_CONFIG.walkSpeed;
        let move = {
            x: 0,
            y: 0
        }
        
        if (keys.LEFT || keys.RIGHT || keys.UP || keys.DOWN) {
            socket.emit('playerKeys', keys);
        }

        if (keys.LEFT) {
            move.x -= movespeed;
        }
        if (keys.RIGHT) {
            move.x += movespeed;
        }
        if (keys.UP) {
            move.y -= movespeed;
        }
        if (keys.DOWN) {
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
  