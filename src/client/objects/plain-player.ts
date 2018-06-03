import { CONTROLS } from './../../shared/models';
/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */

import { socket } from './../../shared/socket';
import { PLAYER_CONFIG } from '../../shared/models';

export class PlainPlayer extends Phaser.GameObjects.Image {
    private cursors: CursorKeys;
    public id: string;
  
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, id: string) {
      super(scene, x, y, texture);

      this.id = id;
  
      this.initImage();
  
      scene.add.existing(this);
    }
  
    private initImage(): void {
      this.setOrigin(0.5, 0.5);
      this.setScale(0.8);
      this.setSize(40, 50);
      this.setAlpha(1);
      this.setFlip(false, false);
      this.setAngle(0);
    }
}
