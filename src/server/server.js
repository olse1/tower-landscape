"use strict";
exports.__esModule = true;
var models_1 = require("../shared/models");
var express = require("express");
var http_1 = require("http");
var socketIo = require("socket.io");
var GameServer = (function () {
    function GameServer() {
        this.gameHasStarted = false;
        this.hasComet = false;
        this.players = [];
        this.star = {
            x: Math.floor(Math.random() * 700) + 50,
            y: Math.floor(Math.random() * 500) + 50
        };
        this.scores = {
            blue: 0,
            red: 0
        };
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    GameServer.prototype.createApp = function () {
        this.app = express();
        this.app.use(express.static('public'));
        this.app.get('/', function (req, res) {
            res.sendfile("./index.html");
        });
    };
    GameServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    GameServer.prototype.config = function () {
        this.port = GameServer.PORT;
    };
    GameServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    GameServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connection', function (socket) {
            console.log('a user connected');
            // create a new player and add it to our players object
            _this.players[socket.id] = {
                rotation: 0,
                x: Math.floor(Math.random() * 700) + 50,
                y: Math.floor(Math.random() * 500) + 50,
                playerId: socket.id,
                team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
            };
            // send the players object to the new player
            socket.emit('currentPlayers', _this.players);
            // send the star object to the new player
            socket.emit('starLocation', _this.star);
            // send the current scores
            socket.emit('scoreUpdate', _this.scores);
            // update all other players of the new player
            socket.broadcast.emit('newPlayer', _this.players[socket.id]);
            socket.on('disconnect', function () {
                console.log('user disconnected');
                // remove this player from our players object
                delete _this.players[socket.id];
                // emit a message to all players to remove this player
                _this.io.emit('disconnect', socket.id);
            });
            // when a player moves, update the player data
            socket.on('playerMovement', function (movementData) {
                _this.players[socket.id].x = movementData.x;
                _this.players[socket.id].y = movementData.y;
                _this.players[socket.id].rotation = movementData.rotation;
                // emit a message to all players about the player that moved
                socket.broadcast.emit('playerMoved', _this.players[socket.id]);
            });
            socket.on('playerKeys', function (keys) {
                var movespeed = models_1.PLAYER_CONFIG.walkSpeed;
                if (keys.LEFT) {
                    _this.players[socket.id].x -= movespeed;
                }
                if (keys.RIGHT) {
                    _this.players[socket.id].x += movespeed;
                }
                if (keys.UP) {
                    _this.players[socket.id].y -= movespeed;
                }
                if (keys.DOWN) {
                    _this.players[socket.id].y += movespeed;
                }
                console.log("playerKeys: x: " + _this.players[socket.id].x + ", y: " + _this.players[socket.id].y);
                // emit a message to all players about the player that moved
                _this.io.emit('playerMoved', _this.players[socket.id]);
            });
            socket.on('starCollected', function () {
                if (_this.players[socket.id].team === 'red') {
                    _this.scores.red += 10;
                }
                else {
                    _this.scores.blue += 10;
                }
                _this.star.x = Math.floor(Math.random() * 700) + 50;
                _this.star.y = Math.floor(Math.random() * 500) + 50;
                _this.io.emit('starLocation', _this.star);
                _this.io.emit('scoreUpdate', _this.scores);
            });
        });
    };
    GameServer.PORT = 3000;
    return GameServer;
}());
var gameSession = new GameServer();
// gameSession.connect();
