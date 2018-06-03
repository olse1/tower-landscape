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
    public id: number;
  
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, id: number) {
      super(scene, x, y, texture);

      this.id = id;
  
      this.initImage();
      this.initInput(scene);
  
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
    private initInput(scene: Phaser.Scene): void {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  
    update(): void {
      this.handleInput();
    }

    private handleGamepad(): CONTROLS {
        if (this.scene.input.gamepad.total === 0) {
            const keys: CONTROLS = {
                WALK_LEFT: false,
                WALK_RIGHT: false,
                WALK_UP: false,
                WALK_DOWN: false,
                ROTATION: 0
            }
            return keys;
        }

        const pad = this.scene.input.gamepad.getPad(0);

        const x = pad.axes[2].getValue();
        const y = pad.axes[3].getValue();
        let angle = 0;

        if (x != 0 || y != 0) {
            angle = Math.atan2(y, x);
        }

        const keys: CONTROLS = {
            WALK_LEFT: pad.axes[0].getValue() < -0.2,
            WALK_RIGHT: pad.axes[0].getValue() > 0.2,
            WALK_UP: pad.axes[1].getValue() < -0.2,
            WALK_DOWN: pad.axes[1].getValue() > 0.2,
            ROTATION: angle
        }

        return keys;
    }

    private handleKeyboard(): CONTROLS {
        const keys: CONTROLS = {
            WALK_LEFT: this.cursors.left.isDown,
            WALK_RIGHT: this.cursors.right.isDown,
            WALK_UP: this.cursors.up.isDown,
            WALK_DOWN: this.cursors.down.isDown,
            ROTATION: 0
        };
        return keys;
    }

  
    private handleInput(): void {
        const padKeys = this.handleGamepad();
        const keyboardKeys = this.handleKeyboard();

        const keys: CONTROLS = {
            WALK_LEFT: keyboardKeys.WALK_LEFT || padKeys.WALK_LEFT,
            WALK_RIGHT: keyboardKeys.WALK_RIGHT || padKeys.WALK_RIGHT,
            WALK_UP: keyboardKeys.WALK_UP || padKeys.WALK_UP,
            WALK_DOWN: keyboardKeys.WALK_DOWN || padKeys.WALK_DOWN,
            ROTATION: padKeys.ROTATION
        };

        // move player
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
        this.setRotation(keys.ROTATION);
    }

    public move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
