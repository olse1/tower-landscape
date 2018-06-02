/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Particle; });
var Particle = (function () {
    function Particle(gameInstance, sprite) {
        var _this = this;
        this.particle = gameInstance.add.sprite(64, 64, 'dust');
        this.particle.animations.add('dust');
        this.particle.reset(sprite.body.x + -20, sprite.body.y - 30);
        this.particle.animations.play('dust', 16, false);
        setTimeout(function () {
            _this.particle.kill();
        }, 1000);
    }
    return Particle;
}());



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GameEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CometEvent; });
/* unused harmony export ServerEvent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PlayerEvent; });
var GameEvent = (function () {
    function GameEvent() {
    }
    GameEvent.authentication = 'authentication:successful';
    GameEvent.drop = 'drop';
    return GameEvent;
}());

var CometEvent = (function () {
    function CometEvent() {
    }
    CometEvent.create = 'comet:create';
    CometEvent.destroy = 'comet:destroy';
    CometEvent.hit = 'comet:hit';
    CometEvent.coordinates = 'comet:coordinates';
    return CometEvent;
}());

var ServerEvent = (function () {
    function ServerEvent() {
    }
    ServerEvent.connected = 'connection';
    ServerEvent.disconnected = 'disconnect';
    return ServerEvent;
}());

var PlayerEvent = (function () {
    function PlayerEvent() {
    }
    PlayerEvent.joined = 'player:joined';
    PlayerEvent.protagonist = 'player:protagonist';
    PlayerEvent.players = 'actors:collection';
    PlayerEvent.quit = 'player:left';
    PlayerEvent.pickup = 'player:pickup';
    PlayerEvent.hit = 'player:hit';
    PlayerEvent.coordinates = 'player:coordinates';
    return PlayerEvent;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Projectile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pickup_pickup_class__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_particle_class__ = __webpack_require__(0);


var Projectile = (function () {
    function Projectile(gameInstance, player) {
        this.bulletCount = 10;
        this.gameInstance = gameInstance;
        this.weapon = gameInstance.add.weapon(this.bulletCount, 'laser');
        this.weapon.fireLimit = this.bulletCount;
        this.weapon.fireRate = 1000;
        if (player) {
            this.player = player;
            this.weapon.trackSprite(this.player, 10, 0, true);
        }
    }
    Projectile.prototype.fireWeapon = function () {
        this.weapon.fire();
        this.bulletCount = this.weapon.fireLimit - this.weapon.shots;
    };
    Projectile.prototype.renderPickup = function (coors) {
        this.pickup = new __WEBPACK_IMPORTED_MODULE_0__pickup_pickup_class__["a" /* Pickup */](this.gameInstance, coors);
        new __WEBPACK_IMPORTED_MODULE_1__particle_particle_class__["a" /* Particle */](this.gameInstance, this.pickup.item);
    };
    return Projectile;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Explode; });
var Explode = (function () {
    function Explode(gameInstance, player, big) {
        var _this = this;
        if (big) {
            this.explosions = gameInstance.add.sprite(152, 152, 'kaboom-big');
        }
        else {
            this.explosions = gameInstance.add.sprite(64, 64, 'kaboom');
        }
        this.explosions.animations.add('kaboom');
        this.explosions.reset(player.body.x + -20, player.body.y - 30);
        this.explosions.animations.play('kaboom', 15, false);
        setTimeout(function () {
            _this.explosions.kill();
        }, 500);
    }
    return Explode;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(5);



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client_engine_phaser_engine_class__ = __webpack_require__(6);

new __WEBPACK_IMPORTED_MODULE_0__client_engine_phaser_engine_class__["a" /* PhaserSpaceGame */]();


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhaserSpaceGame; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_game_class__ = __webpack_require__(7);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var PhaserSpaceGame = (function (_super) {
    __extends(PhaserSpaceGame, _super);
    function PhaserSpaceGame() {
        var _this = _super.call(this) || this;
        _this.game = new Phaser.Game(1024, 768, Phaser.AUTO, 'space-shooter', {
            preload: _this.preload,
            create: _this.create,
            update: _this.update
        });
        return _this;
    }
    PhaserSpaceGame.prototype.preload = function () {
        var game = this.game.load;
        game.crossOrigin = 'anonymous';
        game.image('space', 'assets/background.jpg');
        game.image('laser', 'assets/bullet.png');
        game.spritesheet('dust', 'assets/dust.png', 64, 64, 16);
        game.spritesheet('kaboom', 'assets/explosions.png', 64, 64, 16);
        game.spritesheet('kaboom-big', 'assets/explosions-big.png', 152, 152, 16);
        game.image('pickup', 'assets/pickup.png');
        game.spritesheet('shooter-sprite', 'assets/ship.png', 32, 32);
        game.spritesheet('shooter-sprite-enemy', 'assets/ship-enemy.png', 32, 32);
        game.spritesheet('asteroid', 'assets/asteroids.png', 128, 128, 31);
    };
    PhaserSpaceGame.prototype.create = function () {
        _super.prototype.properties.call(this, this.game);
        _super.prototype.manageAssets.call(this, this.game);
    };
    PhaserSpaceGame.prototype.update = function () {
        _super.prototype.gameUpdate.call(this, this.game);
    };
    Object.defineProperty(PhaserSpaceGame.prototype, "gameInstance", {
        get: function () {
            return this.game;
        },
        enumerable: true,
        configurable: true
    });
    return PhaserSpaceGame;
}(__WEBPACK_IMPORTED_MODULE_0__game_game_class__["a" /* Game */]));



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_events_model__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actors_player_player_class__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__props_powers_projectile_projectile_class__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scenes_login__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__props_asteroid_asteroid_class__ = __webpack_require__(13);





var Game = (function () {
    function Game() {
        window.socket = io.connect();
        this.login = new __WEBPACK_IMPORTED_MODULE_3__scenes_login__["a" /* LoginScene */]();
    }
    Game.prototype.manageAssets = function (game) {
        var _this = this;
        this.actors = [];
        this.comets = [];
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].joined, function (player) {
            _this.actors.push(new __WEBPACK_IMPORTED_MODULE_1__actors_player_player_class__["a" /* Player */](game, player, 'shooter-sprite-enemy'));
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].protagonist, function (player) {
            _this.actor = new __WEBPACK_IMPORTED_MODULE_1__actors_player_player_class__["a" /* Player */](game, player, 'shooter-sprite');
            _this.actors.push(_this.actor);
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].players, function (players) {
            players.map(function (player) {
                var enemy = new __WEBPACK_IMPORTED_MODULE_1__actors_player_player_class__["a" /* Player */](game, player, 'shooter-sprite-enemy');
                if (player.ammo) {
                    enemy.assignPickup(game, enemy);
                }
                _this.actors.push(enemy);
            });
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].quit, function (playerId) {
            _this.actors
                .filter(function (actor) { return actor.player.id === playerId; })
                .map(function (actor) { return actor.player.kill(); });
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["b" /* GameEvent */].drop, function (coors) {
            if (_this.projectile) {
                _this.projectile.pickup.item.kill();
            }
            _this.projectile = new __WEBPACK_IMPORTED_MODULE_2__props_powers_projectile_projectile_class__["a" /* Projectile */](game);
            _this.projectile.renderPickup(coors);
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["a" /* CometEvent */].create, function (comet) {
            _this.comet = new __WEBPACK_IMPORTED_MODULE_4__props_asteroid_asteroid_class__["a" /* Asteroid */](game, comet);
            _this.comets.push(_this.comet);
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["a" /* CometEvent */].coordinates, function (coors) {
            if (_this.comet) {
                _this.comet.asteroid.x = coors.x;
                _this.comet.asteroid.y = coors.y;
            }
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["a" /* CometEvent */].destroy, function () {
            if (_this.comet) {
                _this.comet.asteroid.kill();
                _this.comet = null;
            }
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["a" /* CometEvent */].hit, function () {
            if (_this.comet) {
                _this.comet.hit();
            }
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].hit, function (enemy) {
            _this.actors
                .filter(function (actor) { return _this.actor.player.id === enemy; })
                .map(function (actor) { return window.location.reload(); });
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].pickup, function (player) {
            _this.actors
                .filter(function (actor) { return actor.player.id === player; })
                .map(function (actor) { return actor.assignPickup(game, actor); });
            _this.projectile.pickup.item.kill();
        });
        window.socket.on(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].coordinates, function (player) {
            _this.actors.filter(function (actor) {
                if (actor.player.id === player.player.id) {
                    actor.player.x = player.coors.x;
                    actor.player.y = player.coors.y;
                    actor.player.rotation = player.coors.r;
                    if (actor.projectile) {
                        actor.hud.update(player.coors.a);
                    }
                    if (player.coors.f) {
                        actor.projectile.fireWeapon();
                    }
                    if (player.coors.m) {
                        actor.player.animations.play('accelerating');
                    }
                }
            });
        });
    };
    Game.prototype.gameUpdate = function (game) {
        var _this = this;
        if (this.comet) {
            game.physics.arcade.collide(this.comet.asteroid, this.actors.map(function (actor) { return actor.player; }), function (comet, actor) {
                if (actor.id !== _this.actor.player.id) {
                    actor.destroy();
                    window.socket.emit(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].hit, actor.id);
                }
                else {
                    window.location.reload();
                }
            });
            if (this.actor && this.actor.projectile) {
                game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.comets.map(function (comet) { return comet.asteroid; }), function (comet, projectile) {
                    window.socket.emit(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["a" /* CometEvent */].hit, comet.id);
                    projectile.kill();
                    _this.comet.hit();
                });
            }
        }
        if (this.actor && this.actor.controls) {
            this.actor.view();
            window.socket.emit(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].coordinates, {
                x: this.actor.player.position.x,
                y: this.actor.player.position.y,
                r: this.actor.player.rotation,
                f: this.actor.playerState.get('fire'),
                m: this.actor.playerState.get('moving'),
                a: this.actor.playerState.get('ammo')
            });
            game.physics.arcade.collide(this.actor.player, this.actors.map(function (actor) { return actor.player; }));
            if (this.actor.projectile) {
                game.physics.arcade.collide(this.actor.projectile.weapon.bullets, this.actors.map(function (actor) { return actor.player; }), function (enemy, projectile) {
                    if (enemy.id !== _this.actor.player.id) {
                        window.socket.emit(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].hit, enemy.id);
                        projectile.kill();
                        enemy.destroy();
                    }
                });
            }
            if (this.projectile) {
                game.physics.arcade.overlap(this.projectile.pickup.item, this.actors.map(function (actor) { return actor.player; }), function (pickup, actor) {
                    _this.actors
                        .filter(function (actorInstance) { return actor.id === actorInstance.player.id; })
                        .map(function (actorInstance) { return actorInstance.assignPickup(game, actorInstance); });
                    window.socket.emit(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["c" /* PlayerEvent */].pickup, {
                        uuid: actor.id,
                        ammo: true
                    });
                    pickup.kill();
                });
            }
        }
    };
    Game.prototype.properties = function (game) {
        game.stage.disableVisibilityChange = true;
        game.add.tileSprite(0, 0, game.width, game.height, 'space');
        game.add.sprite(0, 0, 'space');
        game.time.desiredFps = 60;
        game.renderer.clearBeforeRender = false;
        game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    return Game;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Player; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controls_keyboard_class__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__props_powers_projectile_projectile_class__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hud_hud_class__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__props_particle_particle_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__props_explosion_explosion_class__ = __webpack_require__(3);





var Player = (function () {
    function Player(gameInstance, playerInstance, type) {
        this.gameInstance = gameInstance;
        this.playerInstance = playerInstance;
        this.angularVelocity = 300;
        this.createPlayer(this.gameInstance, type);
        this.playerState = new Map();
    }
    Player.prototype.createPlayer = function (gameInstance, type) {
        var _this = this;
        this.hud = new __WEBPACK_IMPORTED_MODULE_2__hud_hud_class__["a" /* Hud */]();
        this.addControls();
        this.player = gameInstance.add.sprite(this.playerInstance.x, this.playerInstance.y, type);
        this.player.id = this.playerInstance.id;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('accelerating', [1, 0], 60, false);
        this.player.name = this.playerInstance.name;
        this.attachPhysics(gameInstance);
        this.player.destroy = function () {
            new __WEBPACK_IMPORTED_MODULE_4__props_explosion_explosion_class__["a" /* Explode */](_this.gameInstance, _this.player);
            _this.player.kill();
        };
        this.hud.setName(gameInstance, this.player);
        this.particle = new __WEBPACK_IMPORTED_MODULE_3__props_particle_particle_class__["a" /* Particle */](gameInstance, this.player);
    };
    Player.prototype.assignPickup = function (game, player) {
        this.projectile = new __WEBPACK_IMPORTED_MODULE_1__props_powers_projectile_projectile_class__["a" /* Projectile */](game, player.player);
        this.hud.setAmmo(game, player.player, this.projectile);
        this.playerState.set('ammo', this.projectile.bulletCount);
    };
    Player.prototype.view = function () {
        this.controls.update();
        if (this.projectile) {
            this.hud.update(this.playerState.get('ammo'));
        }
    };
    Player.prototype.addControls = function () {
        this.controls = new __WEBPACK_IMPORTED_MODULE_0__controls_keyboard_class__["a" /* KeyBoardControl */](this.gameInstance, this);
    };
    Player.prototype.attachPhysics = function (gameInstance) {
        gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(10, 10);
        this.player.body.gravity.y = 0;
        this.player.body.drag.set(80);
        this.player.body.maxVelocity.set(100);
        this.player.body.immovable = false;
    };
    return Player;
}());



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyBoardControl; });
var KeyBoardControl = (function () {
    function KeyBoardControl(gameInstance, playerInstance) {
        this.gameInstance = gameInstance;
        this.playerInstance = playerInstance;
        this.gameControls = {
            cursors: this.gameInstance.input.keyboard.createCursorKeys(),
            fireWeapon: this.gameInstance.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
        };
    }
    KeyBoardControl.prototype.update = function () {
        if (this.playerInstance.player.alive) {
            this.playerInstance.playerState.set('fire', false);
            if (this.gameControls.cursors.up.isDown) {
                this.gameInstance.physics.arcade.accelerationFromRotation(this.playerInstance.player.rotation, 100, this.playerInstance.player.body.acceleration);
                this.playerInstance.player.animations.play('accelerating');
                this.playerInstance.playerState.set('moving', true);
            }
            else {
                this.playerInstance.player.body.acceleration.set(0);
                this.playerInstance.playerState.set('moving', false);
            }
            if (this.gameControls.cursors.left.isDown) {
                this.playerInstance.player.body.angularVelocity = -this.playerInstance.angularVelocity;
            }
            else if (this.gameControls.cursors.right.isDown) {
                this.playerInstance.player.body.angularVelocity = this.playerInstance.angularVelocity;
            }
            else {
                this.playerInstance.player.body.angularVelocity = 0;
            }
            if (this.gameControls.fireWeapon.isDown) {
                if (this.playerInstance.projectile) {
                    this.playerInstance.projectile.fireWeapon();
                    this.playerInstance.playerState.set('fire', true);
                    this.playerInstance.playerState.set('ammo', this.playerInstance.projectile.bulletCount);
                }
                else {
                    this.playerInstance.playerState.set('fire', false);
                }
            }
        }
    };
    return KeyBoardControl;
}());



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pickup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particle_particle_class__ = __webpack_require__(0);

var Pickup = (function () {
    function Pickup(game, coors) {
        this.item = game.add.sprite(coors.x, coors.y, 'pickup');
        game.physics.enable(this.item, Phaser.Physics.ARCADE);
        this.particle = new __WEBPACK_IMPORTED_MODULE_0__particle_particle_class__["a" /* Particle */](game, this.item);
    }
    return Pickup;
}());



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hud; });
var Hud = (function () {
    function Hud() {
        this.style = {
            font: '10px Arial',
            fill: '#ffffff'
        };
    }
    Hud.prototype.setName = function (game, player) {
        this.name = game.add.text(0, 10, player.name.substring(0, 6), this.style);
        player.addChild(this.name);
    };
    Hud.prototype.update = function (ammo) {
        this.ammo.setText("" + (ammo ? ammo : ''));
    };
    Hud.prototype.setAmmo = function (game, player, weapon) {
        if (this.ammo) {
            this.ammo.setText('');
        }
        this.ammo = game.add.text(0, 25, weapon.bulletCount, this.style);
        player.addChild(this.ammo);
    };
    return Hud;
}());



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginScene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_events_model__ = __webpack_require__(1);

var LoginScene = (function () {
    function LoginScene() {
        this.createForm();
    }
    LoginScene.prototype.createForm = function () {
        var _this = this;
        this.formContainer = document.createElement('div');
        this.formContainer.className = 'form-container';
        this.loginPage = document.createElement('div');
        this.loginPage.className = 'login-page';
        this.form = document.createElement('div');
        this.form.className = 'form';
        this.loginForm = document.createElement('form');
        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.placeholder = 'username';
        this.input.id = 'your-name';
        this.input.focus();
        this.button = document.createElement('button');
        this.button.innerText = 'Join game';
        this.button.addEventListener('click', function (e) { return _this.createPlayer(e); });
        this.loginForm.appendChild(this.input);
        this.loginForm.appendChild(this.button);
        this.loginPage.appendChild(this.form);
        this.form.appendChild(this.loginForm);
        this.formContainer.appendChild(this.loginPage);
        document.body.appendChild(this.formContainer);
    };
    LoginScene.prototype.createPlayer = function (e) {
        e.preventDefault();
        this.toggleLogin();
        var name = this.input.value;
        window.socket.emit(__WEBPACK_IMPORTED_MODULE_0__shared_events_model__["b" /* GameEvent */].authentication, { name: name }, {
            x: window.innerWidth,
            y: window.innerHeight
        });
    };
    LoginScene.prototype.toggleLogin = function () {
        this.formContainer.classList.toggle('visible');
    };
    return LoginScene;
}());



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Asteroid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__explosion_explosion_class__ = __webpack_require__(3);

var Asteroid = (function () {
    function Asteroid(gameInstance, cometInstance) {
        var _this = this;
        this.gameInstance = gameInstance;
        this.cometInstance = cometInstance;
        this.gameInstance = gameInstance;
        this.asteroid = gameInstance.add.sprite(0, -128, 'asteroid');
        this.asteroid.animations.add('asteroid');
        this.asteroid.animations.play('asteroid', 10, true, false);
        this.attachPhysics(gameInstance);
        this.asteroid.destroy = function () {
            new __WEBPACK_IMPORTED_MODULE_0__explosion_explosion_class__["a" /* Explode */](_this.gameInstance, _this.asteroid, true);
            _this.asteroid.kill();
        };
        this.asteroid.id = this.cometInstance.id;
    }
    Asteroid.prototype.hit = function () {
        this.asteroid.destroy();
    };
    Asteroid.prototype.attachPhysics = function (gameInstance) {
        gameInstance.physics.enable(this.asteroid, Phaser.Physics.ARCADE);
        this.asteroid.body.collideWorldBounds = false;
        this.asteroid.body.bounce.setTo(0);
        this.asteroid.body.gravity.y = 0;
        this.asteroid.body.drag.set(80);
        this.asteroid.body.maxVelocity.set(100);
        this.asteroid.body.immovable = true;
    };
    return Asteroid;
}());



/***/ })
/******/ ]);