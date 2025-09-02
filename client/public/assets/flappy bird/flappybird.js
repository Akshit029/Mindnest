//board
let board;
let boardWidth = Math.min(360, window.innerWidth * 0.95);
let boardHeight = Math.min(640, window.innerHeight * 0.95);
let context;
let scaleFactor = Math.min(1, window.innerWidth / 360);

//sounds
let wingSound = new Audio('sfx_wing.wav');
let pointSound = new Audio('sfx_point.wav');
let hitSound = new Audio('sfx_hit.wav');
let dieSound = new Audio('sfx_die.wav');
let swooshSound = new Audio('sfx_swooshing.wav');

//bird
let birdWidth = 34 * scaleFactor;
let birdHeight = 24 * scaleFactor;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64 * scaleFactor;
let pipeHeight = 512 * scaleFactor;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2 * scaleFactor;
let velocityY = 0;
let gravity = 0.4 * scaleFactor;

let gameOver = false;
let score = 0;

// Handle window resize
window.addEventListener('resize', function() {
    boardWidth = Math.min(360, window.innerWidth * 0.95);
    boardHeight = Math.min(640, window.innerHeight * 0.95);
    scaleFactor = Math.min(1, window.innerWidth / 360);
    
    board.width = boardWidth;
    board.height = boardHeight;
    
    // Update bird dimensions
    birdWidth = 34 * scaleFactor;
    birdHeight = 24 * scaleFactor;
    bird.width = birdWidth;
    bird.height = birdHeight;
    
    // Update pipe dimensions
    pipeWidth = 64 * scaleFactor;
    pipeHeight = 512 * scaleFactor;
    velocityX = -2 * scaleFactor;
    gravity = 0.4 * scaleFactor;
    
    // Reset game
    resetGame();
});

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";
    
    // Play background music if needed
    let bgMusic = new Audio('bgm_mario.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 1;
    bgMusic.play();
    
    // Initial swoosh sound
    swooshSound.play().catch(e => console.log("Audio play failed:", e));
    
    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird);
    
    // Add touch support for mobile
    document.addEventListener("touchstart", function(e) {
        e.preventDefault();
        if (!gameOver) {
            velocityY = -6 * scaleFactor;
            wingSound.currentTime = 0;
            wingSound.play().catch(e => console.log("Wing sound failed:", e));
        }
    });
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
        dieSound.play().catch(e => console.log("Die sound failed:", e));
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
            pipe.passed = true;
            pointSound.play().catch(e => console.log("Point sound failed:", e));
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
            hitSound.play().catch(e => console.log("Hit sound failed:", e));
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //removes first element from the array
    }

    //score
    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    // Game over text
    if (gameOver) {
        context.fillStyle = "white";
        context.font = "30px 'Courier New', monospace";
        context.textAlign = "center";
        context.fillText("GAME OVER", board.width / 2, board.height / 2);
        context.font = "20px 'Courier New', monospace";
        context.fillText("Tap to play again", board.width / 2, board.height / 2 + 40);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.type == "click") {
        //jump
        velocityY = -6 * scaleFactor;
        
        // Play wing sound
        wingSound.currentTime = 0;
        wingSound.play().catch(e => console.log("Wing sound failed:", e));
        
        //reset game
        if (gameOver) {
            resetGame();
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function resetGame() {
    // Reset game state
    bird.y = birdY;
    pipeArray = [];
    score = 0;
    gameOver = false;
    velocityY = 0;
    
    // Clear the board
    context.clearRect(0, 0, board.width, board.height);
    
    // Redraw bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    
    // Play swoosh sound
    swooshSound.currentTime = 0;
    swooshSound.play().catch(e => console.log("Swoosh sound failed:", e));
}