import { CONTROLS, ServerPlayer } from './../shared/models';
import {
    CometEvent,
    GameEvent,
    PlayerEvent,
    ServerEvent
} from './../shared/events.model';
import {SpaceShip, PLAYER_CONFIG} from '../shared/models';

import * as express from 'express';
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { Socket } from 'net';
import { PlayerControls } from './controls/handle-controls';


class GameServer {

    public static readonly PORT:number = 3000;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    private gameHasStarted: boolean = false;
    private hasComet: boolean = false;
    public players: ServerPlayer[] = [];
    private star = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50
    };
    private scores = {
        blue: 0,
        red: 0
    };

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        this.app.use(express.static('public'));

        this.app.get('/', (req, res) => {
            res.sendfile(`./index.html`);
        });
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = GameServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connection', (socket: any) => {
            console.log('a user connected');
            // create a new player and add it to our players object
            this.players[socket.id] = new ServerPlayer(socket.id);
            // send the players object to the new player
            socket.emit('currentPlayers', this.players);
            // send the star object to the new player
            socket.emit('starLocation', this.star);
            // send the current scores
            socket.emit('scoreUpdate', this.scores);

            // update all other players of the new player
            socket.broadcast.emit('newPlayer', this.players[socket.id]);

            socket.on('disconnect', () => {
                console.log('user disconnected');
                // remove this player from our players object
                delete this.players[socket.id];
                // emit a message to all players to remove this player
                this.io.emit('disconnect', socket.id);
            });

            socket.on('playerKeys', (keys: CONTROLS) => {
                PlayerControls.handleControls(this.players[socket.id], keys);
        console.log(`playerKeys: x: ${this.players[socket.id].x}, y: ${this.players[socket.id].y}`);
                // emit a message to all players about the player that moved
                this.io.emit('playerMoved', this.players[socket.id]);
            });

            socket.on('starCollected', () => {
                if (this.players[socket.id].team === 'red') {
                    this.scores.red += 10;
                } else {
                    this.scores.blue += 10;
                }
                this.star.x = Math.floor(Math.random() * 700) + 50;
                this.star.y = Math.floor(Math.random() * 500) + 50;
                this.io.emit('starLocation', this.star);
                this.io.emit('scoreUpdate', this.scores);
            });
        });
    }
}

const gameSession = new GameServer();

// gameSession.connect();
