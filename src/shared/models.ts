export interface SpaceShip {
    name: string;
    id: string;
    x: number;
    y: number;
    ammo: number;
}

export const PLAYER_CONFIG = {
    walkSpeed: 6
}

export interface CONTROLS {
    WALK_LEFT: boolean;
    WALK_RIGHT: boolean;
    WALK_UP: boolean;
    WALK_DOWN: boolean;
}
