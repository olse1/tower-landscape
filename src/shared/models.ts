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
    ROTATION: number
}

export class PLAYER_CONTROL {
    isDown: boolean = false;
    timestamp: number = 0;
    delta: number = 0;
}

export class PLAYER_CONTROLS {
    WALK_LEFT: PLAYER_CONTROL = new PLAYER_CONTROL();
    WALK_RIGHT: PLAYER_CONTROL = new PLAYER_CONTROL();
    WALK_UP: PLAYER_CONTROL = new PLAYER_CONTROL();
    WALK_DOWN: PLAYER_CONTROL = new PLAYER_CONTROL();
}

export class Player {
    public id = 0;
    
    public x = 0;
    public y = 0;
    public rotation = 0;

    public team = '';

    public controls: PLAYER_CONTROLS = new PLAYER_CONTROLS();
    public timestamp: number = 0;

    public walkSpeed = PLAYER_CONFIG.walkSpeed;

    constructor(id: number,
                x?: number,
                y?: number,
                rotation?: number,
                team?: string,
                controls?: PLAYER_CONTROLS) {
        this.id = id;
        this.x = x ? x : Math.floor(Math.random() * 700) + 50;
        this.y = y ? y : Math.floor(Math.random() * 700) + 50;
        this.rotation = rotation ? rotation : 0;
        this.team = team ? team : (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue';
    }
}
