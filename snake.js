const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Create Unit
const box = 32;


// Load Images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


// Load Audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


// Create The Snake
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}


// Create The Food
let food = {
    x : Math.floor(Math.random() * 17 + 1) * box, 
    y : Math.floor(Math.random() * 15 + 3) * box
}


// Create The Score
let score = 0;


// Snake Controls
let d;

document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(event.keyCode == 38 && d != "DOWN"){
        up.play();
        d = "UP";
    }else if(event.keyCode == 39 && d != "LEFT"){
        right.play();
        d = "RIGHT";
    }else if(event.keyCode == 40 && d != "UP"){
        down.play();
        d = "DOWN";
    }
}


// Check Collision
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Draw To Canvas
function draw(){
    ctx.drawImage(ground, 0, 0);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = ( i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // Old Head Position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    // Which Direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // If Snake Eats Food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box, 
            y : Math.floor(Math.random() * 15 + 3) * box
        }
        // Don't Remove Tail
    }else{
        // Remove Tail
        snake.pop();
    }

 // Add New Head
 let newHead = {
    x : snakeX,
    y : snakeY
}


    // Game Over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box
        || snakeY > 17 * box || collision(newHead, snake)){
            clearInterval(game);
            dead.play();
        }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px arial";
    ctx.fillText(score, 2 * box, 106 * box);

    
}

// Call Draw Function Every 100 ms
let game = setInterval(draw, 100);