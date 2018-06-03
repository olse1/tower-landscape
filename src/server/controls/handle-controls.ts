import { PLAYER_CONFIG, CONTROLS, Player, PLAYER_CONTROL } from './../../shared/models';

export class PlayerControls {
    static handleControls(player: Player, keys: CONTROLS) {
        player.timestamp = Date.now();
        this.handleMoving(player, keys);
    }

    private static handleMoving(player: Player, keys: CONTROLS) {
        this.handleControl(player.controls.WALK_LEFT, keys.WALK_LEFT, player.timestamp);
        this.handleControl(player.controls.WALK_RIGHT, keys.WALK_RIGHT, player.timestamp);
        this.handleControl(player.controls.WALK_UP, keys.WALK_UP, player.timestamp);
        this.handleControl(player.controls.WALK_DOWN, keys.WALK_DOWN, player.timestamp);

        if (keys.WALK_LEFT) {
            player.x -= player.walkSpeed * player.controls.WALK_LEFT.delta;
        }
        if (keys.WALK_RIGHT) {
            player.x += player.walkSpeed * player.controls.WALK_RIGHT.delta;
        }
        if (keys.WALK_UP) {
            player.y -= player.walkSpeed * player.controls.WALK_UP.delta;
        }
        if (keys.WALK_DOWN) {
            player.y += player.walkSpeed * player.controls.WALK_DOWN.delta;
        }

        // update rotation
        player.rotation = keys.ROTATION;
    }

    private static handleControl(control: PLAYER_CONTROL, controlDown: boolean, timestamp) {
        control.timestamp = control.isDown === controlDown ? control.timestamp : timestamp;
        if (controlDown) {
            const delta = (timestamp - control.timestamp) / 10;
            // @TODO - THIS IS A HACK - CONTROL CHANGES HAVE TO BE GIVEN TO THE SERVER - NOT ONLY PUSH DOWNS
            control.delta = delta > 1 ? 1 : delta;
        }
        control.timestamp = timestamp;
        control.isDown = controlDown;
    }
}
