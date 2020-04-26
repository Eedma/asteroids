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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/class/index.js":
/*!*******************************!*\
  !*** ./src/js/class/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar canvasWidth = window.innerWidth;\nvar canvasHeight = window.innerHeight;\nvar canvas = document.getElementById(\"canvas\");\nvar ctx = canvas.getContext(\"2d\");\n\nvar Game = exports.Game = function Game() {\n    _classCallCheck(this, Game);\n\n    this.keys = [];\n    this.bullets = [];\n    this.asteroids = [];\n    this.score = 0;\n    this.lives = 3;\n    this.exp = 1;\n};\n\nvar Ship = exports.Ship = function () {\n    function Ship() {\n        _classCallCheck(this, Ship);\n\n        this.visible = true;\n        this.x = canvasWidth / 2;\n        this.y = canvasHeight / 2;\n        this.movingForward = false;\n        this.speed = 0.1;\n        this.velX = 0;\n        this.velY = 0;\n        this.rotateSpeed = 0.001;\n        this.radius = 15;\n        this.angle = 0;\n        this.strokeColor = 'white';\n        // Used to know where to fire the bullet from\n        this.noseX = canvasWidth / 2 + 15;\n        this.noseY = canvasHeight / 2;\n    }\n\n    _createClass(Ship, [{\n        key: \"Rotate\",\n        value: function Rotate(dir) {\n            this.angle += this.rotateSpeed * dir;\n        }\n    }, {\n        key: \"Update\",\n        value: function Update() {\n            // Get current direction ship is facing\n            var radians = this.angle / Math.PI * 180;\n\n            // If moving forward calculate changing values of x & y\n            // If you want to find the new point x use the \n            // formula oldX + cos(radians) * distance\n            // Forumla for y oldY + sin(radians) * distance\n            if (this.movingForward) {\n                this.velX += Math.cos(radians) * this.speed;\n                this.velY += Math.sin(radians) * this.speed;\n            }\n            // If ship goes off board place it on the opposite\n            // side    \n            if (this.x < this.radius) {\n                this.x = canvas.width;\n            }\n            if (this.x > canvas.width) {\n                this.x = this.radius;\n            }\n            if (this.y < this.radius) {\n                this.y = canvas.height;\n            }\n            if (this.y > canvas.height) {\n                this.y = this.radius;\n            }\n            // Slow ship speed when not holding key\n            this.velX *= 0.99;\n            this.velY *= 0.99;\n\n            // Change value of x & y while accounting for\n            // air friction    \n            this.x -= this.velX;\n            this.y -= this.velY;\n        }\n    }, {\n        key: \"Draw\",\n        value: function Draw() {\n            ctx.strokeStyle = this.strokeColor;\n            ctx.beginPath();\n            // Angle between vertices of the ship\n            var vertAngle = Math.PI * 2 / 3;\n\n            var radians = this.angle / Math.PI * 180;\n            // Where to fire bullet from\n            this.noseX = this.x - this.radius * Math.cos(radians);\n            this.noseY = this.y - this.radius * Math.sin(radians);\n\n            for (var i = 0; i < 3; i++) {\n                ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));\n            }\n            ctx.closePath();\n            ctx.stroke();\n        }\n    }]);\n\n    return Ship;\n}();\n\nvar Bullet = exports.Bullet = function () {\n    function Bullet(ship) {\n        _classCallCheck(this, Bullet);\n\n        this.visible = true;\n        this.x = ship.noseX;\n        this.y = ship.noseY;\n        this.angle = ship.angle;\n        this.height = 4;\n        this.width = 4;\n        this.speed = 10;\n        this.velX = 0;\n        this.velY = 0;\n    }\n\n    _createClass(Bullet, [{\n        key: \"Update\",\n        value: function Update() {\n            var radians = this.angle / Math.PI * 180;\n            this.x -= Math.cos(radians) * this.speed;\n            this.y -= Math.sin(radians) * this.speed;\n        }\n    }, {\n        key: \"Draw\",\n        value: function Draw() {\n            ctx.fillStyle = 'white';\n            ctx.fillRect(this.x, this.y, this.width, this.height);\n        }\n    }]);\n\n    return Bullet;\n}();\n\nvar Asteroid = exports.Asteroid = function () {\n    function Asteroid(x, y, radius, level, collisionRadius, speed) {\n        _classCallCheck(this, Asteroid);\n\n        this.visible = true;\n        this.x = x || Math.floor(Math.random() * canvasWidth);\n        this.y = y || Math.floor(Math.random() * canvasHeight);\n        this.speed = 1 || false;\n        this.radius = radius || 50;\n        this.angle = Math.floor(Math.random() * 359);\n        this.strokeColor = 'white';\n        this.collisionRadius = collisionRadius || 46;\n        // Used to decide if this asteroid can be broken into smaller pieces\n        this.level = level || 1;\n    }\n\n    _createClass(Asteroid, [{\n        key: \"Update\",\n        value: function Update() {\n            var radians = this.angle / Math.PI * 180;\n            this.x += Math.cos(radians) * this.speed;\n            this.y += Math.sin(radians) * this.speed;\n            if (this.x < this.radius) {\n                this.x = canvas.width;\n            }\n            if (this.x > canvas.width) {\n                this.x = this.radius;\n            }\n            if (this.y < this.radius) {\n                this.y = canvas.height;\n            }\n            if (this.y > canvas.height) {\n                this.y = this.radius;\n            }\n        }\n    }, {\n        key: \"Draw\",\n        value: function Draw() {\n            ctx.beginPath();\n            var vertAngle = Math.PI * 2 / 6;\n            var radians = this.angle / Math.PI * 180;\n            for (var i = 0; i < 6; i++) {\n                ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));\n            }\n            ctx.closePath();\n            ctx.stroke();\n        }\n    }]);\n\n    return Asteroid;\n}();\n\n//# sourceURL=webpack:///./src/js/class/index.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _class = __webpack_require__(/*! ./class */ \"./src/js/class/index.js\");\n\nvar _api = __webpack_require__(/*! ./utils/api */ \"./src/js/utils/api.js\");\n\nvar _api2 = _interopRequireDefault(_api);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar canvas = void 0;\nvar ctx = void 0;\nvar canvasWidth = window.innerWidth;\nvar canvasHeight = window.innerHeight;\nvar id = void 0;\nvar game = void 0;\nvar ship = void 0;\nvar highScore = void 0;\nvar localStorageName = \"HighScore\";\nvar all_scores = void 0;\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    document.getElementById('start').style.display = \"block\";\n});\n\ndocument.getElementById('play').addEventListener('click', function () {\n    SetupCanvas();\n    document.getElementById('start').style.display = \"none\";\n});\n\ndocument.getElementById('play-again').addEventListener('click', function () {\n    SetupCanvas();\n    document.getElementById('read-score').style.display = \"none\";\n});\n\nfunction SetupCanvas() {\n    game = new _class.Game();\n    canvas = document.getElementById(\"canvas\");\n    ctx = canvas.getContext(\"2d\");\n    canvas.width = canvasWidth;\n    canvas.height = canvasHeight;\n    ctx.fillStyle = \"black\";\n    ctx.fillRect(0, 0, canvas.width, canvas.height);\n    ship = new _class.Ship();\n\n    for (var i = 0; i < game.exp + 8; i++) {\n        game.asteroids.push(new _class.Asteroid());\n    }\n\n    // Store all possible keycodes in an array so that\n    // multiple keys can work at the same time\n    document.body.addEventListener(\"keydown\", HandleKeyDown);\n    document.body.addEventListener(\"keyup\", HandleKeyUp);\n\n    // Retrieves locally stored high scores\n    if (localStorage.getItem(localStorageName) == null) {\n        highScore = 0;\n    } else {\n        highScore = localStorage.getItem(localStorageName);\n    }\n\n    Render();\n}\n\n// Move event handling functions so that we can turn off\n// event handling if game over is reached\nfunction HandleKeyDown(e) {\n    game.keys[e.keyCode] = true;\n}\n\nfunction HandleKeyUp(e) {\n    game.keys[e.keyCode] = false;\n    if (e.keyCode === 32) {\n        game.bullets.push(new _class.Bullet(ship));\n    }\n}\n\nfunction CircleCollision(p1x, p1y, r1, p2x, p2y, r2) {\n    var radiusSum = void 0;\n    var xDiff = void 0;\n    var yDiff = void 0;\n\n    radiusSum = r1 + r2;\n    xDiff = p1x - p2x;\n    yDiff = p1y - p2y;\n\n    if (radiusSum > Math.sqrt(xDiff * xDiff + yDiff * yDiff)) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\n// Handles drawing life ships on screen\nfunction DrawLifeShips() {\n\n    document.getElementById('remaining-lifes').innerHTML = '';\n\n    for (var j = 0; j < game.lives; j++) {\n        document.getElementById('remaining-lifes').innerHTML += ' <i class=\"nes-icon is-medium heart\" id=\"' + j + '\"></i>';\n    }\n}\n\nfunction Render() {\n    // Check if the ship is moving forward\n    ship.movingForward = game.keys[87];\n\n    if (game.keys[68]) {\n        // d key rotate right\n        ship.Rotate(1);\n    }\n    if (game.keys[65]) {\n        // a key rotate left\n        ship.Rotate(-1);\n    }\n\n    ctx.clearRect(0, 0, canvasWidth, canvasHeight);\n\n    document.getElementById('score').innerHTML = '';\n    document.getElementById('score').innerHTML = 'score: ' + game.score;\n\n    if (game.asteroids.length === 0) {\n        /* \n        ship.x = canvasWidth / 2;\n        ship.y = canvasHeight / 2;\n        ship.velX = 0;\n        ship.velY = 0; */\n        // set here for increment level\n        game.exp += 1;\n        for (var i = 0; i < game.exp + 8; i++) {\n            var asteroid = new _class.Asteroid();\n\n            asteroid.speed = game.exp;\n            game.asteroids.push(asteroid);\n        }\n    }\n\n    // Draw life ships\n    DrawLifeShips();\n\n    // Check for collision of ship with asteroid\n    if (game.asteroids.length !== 0) {\n        for (var k = 0; k < game.asteroids.length; k++) {\n            if (CircleCollision(ship.x, ship.y, 11, game.asteroids[k].x, game.asteroids[k].y, game.asteroids[k].collisionRadius)) {\n                ship.x = canvasWidth / 2;\n                ship.y = canvasHeight / 2;\n                ship.velX = 0;\n                ship.velY = 0;\n                game.lives -= 1;\n            }\n        }\n    }\n\n    // Check for collision with bullet and asteroid\n    if (game.asteroids.length !== 0 && game.bullets.length != 0) {\n        loop1: for (var l = 0; l < game.asteroids.length; l++) {\n            for (var m = 0; m < game.bullets.length; m++) {\n                if (CircleCollision(game.bullets[m].x, game.bullets[m].y, 3, game.asteroids[l].x, game.asteroids[l].y, game.asteroids[l].collisionRadius)) {\n                    // Check if asteroid can be broken into smaller pieces\n                    if (game.asteroids[l].level === 1) {\n                        game.asteroids.push(new _class.Asteroid(game.asteroids[l].x - 5, game.asteroids[l].y - 5, 25, 2, 22, game.exp - 1));\n                        game.asteroids.push(new _class.Asteroid(game.asteroids[l].x + 5, game.asteroids[l].y + 5, 25, 2, 22, game.exp - 1));\n                    } else if (game.asteroids[l].level === 2) {\n                        game.asteroids.push(new _class.Asteroid(game.asteroids[l].x - 5, game.asteroids[l].y - 5, 15, 3, 12, game.exp - 0.5));\n                        game.asteroids.push(new _class.Asteroid(game.asteroids[l].x + 5, game.asteroids[l].y + 5, 15, 3, 12, game.exp - 0.5));\n                    }\n                    game.asteroids.splice(l, 1);\n                    game.bullets.splice(m, 1);\n                    game.score += 20;\n\n                    // Used to break out of loops because splicing arrays\n                    // you are looping through will break otherwise\n                    break loop1;\n                }\n            }\n        }\n    }\n\n    if (ship.visible) {\n        ship.Update();\n        ship.Draw();\n    }\n\n    if (game.bullets.length !== 0) {\n        for (var _i = 0; _i < game.bullets.length; _i++) {\n            game.bullets[_i].Update();\n            game.bullets[_i].Draw();\n        }\n    }\n    if (game.asteroids.length !== 0) {\n        for (var j = 0; j < game.asteroids.length; j++) {\n            game.asteroids[j].Update();\n            // Pass j so we can track which asteroid points\n            // to store\n            game.asteroids[j].Draw(j);\n        }\n    }\n\n    // Updates the high score using local storage\n    highScore = Math.max(game.score, highScore);\n    localStorage.setItem(localStorageName, highScore);\n\n    // ctx.font = '21px monospace';\n    document.getElementById('highscore').innerHTML = '';\n    document.getElementById('highscore').innerHTML = 'highscore: ' + highScore;\n    document.getElementById('exp').innerHTML = '';\n    document.getElementById('exp').innerHTML = 'level: ' + game.exp;\n    /* ctx.fillText(\"high score : \" + highScore.toString(), 20, 70);\n    ctx.fillText(\"level : \" + game.exp.toString(), 20, 105); */\n\n    /* console.log('i am making a render') */\n    id = requestAnimationFrame(Render);\n\n    // If no lives signal game over\n    if (game.lives <= 0) {\n        readData();\n        handleGameOver();\n    }\n}\n\nvar handleGameOver = function handleGameOver() {\n\n    document.getElementById('remaining-lifes').innerHTML = '';\n    cancelAnimationFrame(id);\n    // game over so remove event listeners to stop getting keyboard input\n    document.body.removeEventListener(\"keydown\", HandleKeyDown);\n    document.body.removeEventListener(\"keyup\", HandleKeyUp);\n\n    ship.visible = false;\n    document.getElementById('save-score').style.display = \"block\";\n    /* document.getElementById('dialog-rounded').style.display = \"block\"; */\n    document.getElementById('final-score').innerHTML = 'Your score is ' + game.score;\n\n    document.getElementById('save-data').addEventListener('click', saveData);\n\n    /* if (game.lives <= 0) {\n        return cancelAnimationFrame(id)\n    } */\n};\n\nvar saveData = function saveData(e) {\n    e.preventDefault();\n\n    document.getElementById('save-score').style.display = \"none\";\n    document.getElementById('read-score').style.display = \"block\";\n\n    writeScoreList();\n\n    var userName = document.getElementById('name_field').value;\n    var score = game.score;\n\n    var gameData = {\n        userName: userName,\n        score: score\n    };\n    console.log('this is game data', gameData);\n    console.log('all_scores', all_scores);\n    console.log('and this is my shit', all_scores[all_scores.length - 1].data.score);\n\n    if (gameData.score > all_scores[all_scores.length - 1].data.score) {\n        /* questa condizione è sbagliata */\n        // Make API request to create new list\n        _api2.default.create(gameData).then(function (response) {\n            console.log(response);\n        }).catch(function (e) {\n            alert('An API error occurred', e);\n            // console.log('An API error occurred', e)\n        });\n    }\n};\n\nvar readData = function readData() {\n\n    document.getElementById('scores-list').innerHTML = '';\n\n    _api2.default.readAll().then(function (scores) {\n        all_scores = scores;\n\n        if (scores.message === 'unauthorized') {\n            if (isLocalHost()) {\n                alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info');\n            } else {\n                alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct');\n            }\n            return false;\n        }\n\n        console.log(all_scores);\n    }).catch(function (e) {\n        alert('An API error occurred', e);\n        // console.log('An API error occurred', e)\n    });\n};\n\nvar writeScoreList = function writeScoreList() {\n    var data = [];\n    var userName = document.getElementById('name_field').value;\n    var score = game.score;\n\n    var gameData = {\n        userName: userName,\n        score: score\n    };\n\n    data.push(gameData);\n    all_scores.forEach(function (x) {\n        return data.push(x.data);\n    });\n\n    data.sort(function (a, b) {\n        return b.score - a.score;\n    }).map(function (e) {\n        document.getElementById('scores-list').innerHTML += '\\n                <tr>\\n                    <td>' + e.userName + '</td>\\n                    <td>' + e.score + '</td>\\n                </tr>\\n              ';\n    });\n};\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/utils/api.js":
/*!*****************************!*\
  !*** ./src/js/utils/api.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/* Api methods to call /functions */\n\nvar create = function create(data) {\n  return fetch('/.netlify/functions/game-data-create', {\n    body: JSON.stringify(data),\n    method: 'POST'\n  }).then(function (response) {\n    return response.json();\n  });\n};\n\nvar readAll = function readAll() {\n  return fetch('/.netlify/functions/game-data-read-all').then(function (response) {\n    return response.json();\n  });\n};\n/* \nconst update = (todoId, data) => {\n  return fetch(`/.netlify/functions/todos-update/${todoId}`, {\n    body: JSON.stringify(data),\n    method: 'POST'\n  }).then(response => {\n    return response.json()\n  })\n}\n\nconst deleteTodo = (todoId) => {\n  return fetch(`/.netlify/functions/todos-delete/${todoId}`, {\n    method: 'POST',\n  }).then(response => {\n    return response.json()\n  })\n}\n\nconst batchDeleteTodo = (todoIds) => {\n  return fetch(`/.netlify/functions/todos-delete-batch`, {\n    body: JSON.stringify({\n      ids: todoIds\n    }),\n    method: 'POST'\n  }).then(response => {\n    return response.json()\n  })\n} \n*/\n\nexports.default = {\n  create: create,\n  readAll: readAll\n  /* update: update,\n  delete: deleteTodo,\n  batchDelete: batchDeleteTodo */\n};\n\n//# sourceURL=webpack:///./src/js/utils/api.js?");

/***/ })

/******/ });