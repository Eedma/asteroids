let canvas;
let ctx;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let id;
let game
let ship;
let highScore;
let localStorageName = "HighScore";

class Game{
    constructor(){
        this.keys = [];
        this.bullets = [];
        this.asteroids = [];
        this.score = 0;
        this.lives = 3;
    }
}

class Ship {
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';
        // Used to know where to fire the bullet from
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
    }
    Rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }
    Update() {
        // Get current direction ship is facing
        let radians = this.angle / Math.PI * 180;
 
        // If moving forward calculate changing values of x & y
        // If you want to find the new point x use the 
        // formula oldX + cos(radians) * distance
        // Forumla for y oldY + sin(radians) * distance
        if (this.movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        // If ship goes off board place it on the opposite
        // side    
        if (this.x < this.radius) {
            this.x = canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = this.radius;
        }
        if (this.y < this.radius) {
            this.y = canvas.height;
        }
        if (this.y > canvas.height) {
            this.y = this.radius;
        }
        // Slow ship speed when not holding key
        this.velX *= 0.99;
        this.velY *= 0.99;
 
        // Change value of x & y while accounting for
        // air friction    
        this.x -= this.velX;
        this.y -= this.velY;
    }
    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        // Angle between vertices of the ship
        let vertAngle = ((Math.PI * 2) / 3);
 
        let radians = this.angle / Math.PI * 180;
        // Where to fire bullet from
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);
 
        for (let i = 0; i < 3; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}
 
class Bullet{
    constructor(angle) {
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
    }
    Update(){
        let radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }
    Draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
 
class Asteroid{
    constructor(x,y,radius,level,collisionRadius) {
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth);
        this.y = y || Math.floor(Math.random() * canvasHeight);
        this.speed = 1;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white';
        this.collisionRadius = collisionRadius || 46;
        // Used to decide if this asteroid can be broken into smaller pieces
        this.level = level || 1;  
    }
    Update(){
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
        if (this.x < this.radius) {
            this.x = canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = this.radius;
        }
        if (this.y < this.radius) {
            this.y = canvas.height;
        }
        if (this.y > canvas.height) {
            this.y = this.radius;
        }
    }
    Draw(){
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;
        for(let i = 0; i < 6; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}
 
document.addEventListener('DOMContentLoaded', SetupCanvas);


    document.addEventListener("keydown", function(e){
        console.log('cippa')
        if(game.lives <= 0){
            if(e.keyCode === 32){
                SetupCanvas()
            }
        }
        
    })
 
function SetupCanvas(){
    game = new Game()
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ship = new Ship();
 
    for(let i = 0; i < 8; i++){
        game.asteroids.push(new Asteroid());
    }
 
    // Store all possible keycodes in an array so that
    // multiple keys can work at the same time
    // document.body.addEventListener("keydown", function(e) {
    //     keys[e.keyCode] = true;
    // });
    // document.body.addEventListener("keyup", function(e) {
    //     keys[e.keyCode] = false;
    //     if (e.keyCode === 32){
    //         bullets.push(new Bullet(ship.angle));
    //     }
    // });
    document.body.addEventListener("keydown", HandleKeyDown);
    document.body.addEventListener("keyup", HandleKeyUp);
 
    // Retrieves locally stored high scores
    if (localStorage.getItem(localStorageName) == null) {
        highScore = 0;
    } else {
        highScore = localStorage.getItem(localStorageName);
    }
 
    Render();
}


// Move event handling functions so that we can turn off
// event handling if game over is reached
function HandleKeyDown(e){
    game.keys[e.keyCode] = true;
}
function HandleKeyUp(e){
    game.keys[e.keyCode] = false;
    if (e.keyCode === 32){
        game.bullets.push(new Bullet(ship.angle));
    }
}

 
function CircleCollision(p1x, p1y, r1, p2x, p2y, r2){
    let radiusSum;
    let xDiff;
    let yDiff;
 
    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
 
    if (radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))) {
        return true;
    } else {
        return false;
    }
}
 
// Handles drawing life ships on screen
function DrawLifeShips(){
    let startX = 1350;
    let startY = 10;
    let points = [[9, 9], [-9, 9]];
    ctx.strokeStyle = 'white'; // Stroke color of ships
    // Cycle through all live ships remaining
    for(let i = 0; i < game.lives; i++){
        // Start drawing ship
        ctx.beginPath();
        // Move to origin point
        ctx.moveTo(startX, startY);
        // Cycle through all other points
        for(let j = 0; j < points.length; j++){
            ctx.lineTo(startX + points[j][0], 
                startY + points[j][1]);
        }
        // Draw from last point to 1st origin point
        ctx.closePath();
        // Stroke the ship shape white
        ctx.stroke();
        // Move next shape 30 pixels to the left
        startX -= 30;
    }
}
 
function Render() {
    // Check if the ship is moving forward
    ship.movingForward = (game.keys[87]);
 
    if (game.keys[68]) {
        // d key rotate right
        ship.Rotate(1);
    }
    if (game.keys[65]) {
        // a key rotate left
       ship.Rotate(-1);
    }
   
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
 
    // Display score
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText("SCORE : " + game.score.toString(), 20, 35);
 
    // If no lives signal game over
    if(game.lives <= 0){
        // If Game over remove event listeners to stop getting keyboard input
        document.body.removeEventListener("keydown", HandleKeyDown);
        document.body.removeEventListener("keyup", HandleKeyUp);
 
        ship.visible = false;
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText("GAME OVER", canvasWidth / 2 - 150, canvasHeight / 2);
        ctx.fillText("press spacebar to play again", canvasWidth / 2 - 300, canvasHeight / 1.5);

        if(game.lives <= 0){
            return cancelAnimationFrame(id)
        }

        
    }
 
    if(game.asteroids.length === 0){
        ship.x = canvasWidth / 2;
        ship.y = canvasHeight / 2;
        ship.velX = 0;
        ship.velY = 0;
        for(let i = 0; i < 8; i++){
            let asteroid = new Asteroid();
            asteroid.speed += .5;
            game.asteroids.push(asteroid);
        }
    }
 
    // Draw life ships
    DrawLifeShips();
 
    // Check for collision of ship with asteroid
    if (game.asteroids.length !== 0) {
        for(let k = 0; k < game.asteroids.length; k++){
            if(CircleCollision(ship.x, ship.y, 11, game.asteroids[k].x, game.asteroids[k].y, game.asteroids[k].collisionRadius)){
                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                game.lives -= 1;
            }
        }
    }
 
    // Check for collision with bullet and asteroid
    if (game.asteroids.length !== 0 && game.bullets.length != 0){
loop1:
        for(let l = 0; l < game.asteroids.length; l++){
            for(let m = 0; m < game.bullets.length; m++){
                if(CircleCollision(game.bullets[m].x, game.bullets[m].y, 3, game.asteroids[l].x, game.asteroids[l].y, game.asteroids[l].collisionRadius)){
                    // Check if asteroid can be broken into smaller pieces
                    if(game.asteroids[l].level === 1){
                        game.asteroids.push(new Asteroid(game.asteroids[l].x - 5, game.asteroids[l].y - 5, 25, 2, 22));
                        game.asteroids.push(new Asteroid(game.asteroids[l].x + 5, game.asteroids[l].y + 5, 25, 2, 22));
                    } else if(game.asteroids[l].level === 2){
                        game.asteroids.push(new Asteroid(game.asteroids[l].x - 5, game.asteroids[l].y - 5, 15, 3, 12));
                        game.asteroids.push(new Asteroid(game.asteroids[l].x + 5, game.asteroids[l].y + 5, 15, 3, 12));
                    }
                    game.asteroids.splice(l,1);
                    game.bullets.splice(m,1);
                    game.score += 20;
 
                    // Used to break out of loops because splicing arrays
                    // you are looping through will break otherwise
                    break loop1;
                }
            }
        }
    }
 
    if(ship.visible){
        ship.Update();
        ship.Draw();
    }
    
    if (game.bullets.length !== 0) {
        for(let i = 0; i < game.bullets.length; i++){
            game.bullets[i].Update();
            game.bullets[i].Draw();
        }
    }
    if (game.asteroids.length !== 0) {
        for(let j = 0; j < game.asteroids.length; j++){
            game.asteroids[j].Update();
            // Pass j so we can track which asteroid points
            // to store
            game.asteroids[j].Draw(j);
        }
    }
 
    // Updates the high score using local storage
    highScore = Math.max(game.score, highScore);
    localStorage.setItem(localStorageName, highScore);
    ctx.font = '21px Arial';
    ctx.fillText("HIGH SCORE : " + highScore.toString(), 20, 70);

    /* console.log('i am making a render') */
    id = requestAnimationFrame(Render);

}