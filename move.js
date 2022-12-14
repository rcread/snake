const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 19;
let tileSize = canvas.width / tileCount - 2;
let headX = 9;
let headY = 9;
const snakeParts = [];
let tailLength = 2;
let appleX = 4;
let appleY = 4;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
const gulpSound = new Audio("gulp.mp3");

function drawGame(){
    changeSnakePosition();
    let result = isGameOver();

    if(result){
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if (score > 2){
        speed = 9;
    }

    if(score > 5){
        speed = 11;
    }

    if(score > 10){
        speed = 13;
    }

    if(score > 15){
        speed = 15;
    }

    if (score > 20){
        speed = 17;
    }

    setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }

    if(headX < 0){
        gameOver = true;
    }

    else if(headX >= tileCount){
    gameOver = true;
    }

    else if(headY < 0){
        gameOver = true;
    }

    else if(headY >= tileCount){
        gameOver = true;
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Courier New";
        ctx.fillText("game over!", canvas.width / 6.5, canvas.height / 2);
    }

    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "20px Courier New";
        ctx.fillText("press space to restart", canvas.width / 5.5, canvas.height / 1.7);
    }

    return gameOver;
}


function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Courier New";
    ctx.fillText("score " + score, canvas.width-60, 10);
}


function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){ 
    ctx.fillStyle = 'green';

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));

    while(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    if (event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    if (event.keyCode == 40){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    if (event.keyCode == 37){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    
    if (event.keyCode == 39){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

function moveUp(){
    console.log('up button has been clicked');
    if(yVelocity == 1)
    return;
    yVelocity = -1;
    xVelocity = 0;
}
function moveLeft(){
    console.log('left button has been clicked');
    if(xVelocity == 1)
    return;
    xVelocity = -1;
    yVelocity = 0;
}
function moveDown(){
    console.log('down button has been clicked');
    if(yVelocity == -1)
    return;
    yVelocity = 1;
    xVelocity = 0;
}
function moveRight(){
    console.log('right button has been clicked');
    if(xVelocity == -1)
    return;
    xVelocity = 1;
    yVelocity = 0;
}

document.body.addEventListener('keydown', newGame);

function newGame(event){
    if(event.keyCode == 32){
        console.log("spacebar pressed");
        window.location.reload();
    }
}

function refreshButton(){
    window.location.reload();
}

drawGame();