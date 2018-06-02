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
    LEFT: boolean;
    RIGHT: boolean;
    UP: boolean;
    DOWN: boolean;
}