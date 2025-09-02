// ================== BOARD ==================
let board;
let boardWidth = Math.min(360, window.innerWidth * 0.95);
let boardHeight = Math.min(640, window.innerHeight * 0.95);
let context;
let scaleFactor = Math.min(1, window.innerWidth / 360);

// ================== SOUNDS ==================
let wingSound = new Audio('sfx_wing.wav');
let pointSound = new Audio('sfx_point.wav');
let hitSound = new Audio('sfx_hit.wav');
let dieSound = new Audio('sfx_die.wav');
let swooshSound = new Audio('sfx_swooshing.wav');

// ================== GAME STATE ==================
let gameOver = false;
let gameStarted = false;
let score = 0;

// ================== BIRD ==================
let birdImg;
let birdWidth = 34 * scaleFactor;
let birdHeight = 24 * scaleFactor;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// ================== PIPES ==================
let pipeArray = [];
let pipeWidth = 64 * scaleFactor;
let pipeHeight = 512 * scaleFactor;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;

// ================== PHYSICS ==================
let velocityX = -2 * scaleFactor;
let velocityY = 0;
let gravity = 0.4 * scaleFactor;

// ================== RESIZE ==================
window.addEventListener('resize', function () {
    boardWidth = Math.min(360, window.innerWidth * 0.95);
    boardHeight = Math.min(640, window.innerHeight * 0.95);
    scaleFactor = Math.min(1, window.innerWidth / 360);

    board.width = boardWidth;
    board.height = boardHeight;

    birdWidth = 34 * scaleFactor;
    birdHeight = 24 * scaleFactor;
    bird.width = birdWidth;
    bird.height = birdHeight;

    pipeWidth = 64 * scaleFactor;
    pipeHeight = 512 * scaleFactor;
    velocityX = -2 * scaleFactor;
    gravity = 0.4 * scaleFactor;

    resetGame();
});

// ================== INIT ==================
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = () => {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    // Optional: Background music
    let bgMusic = new Audio('bgm_mario.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 1;
    bgMusic.play().catch(e => console.log("BGM play failed:", e));

    swooshSound.play().catch(e => console.log("Swoosh sound failed:", e));

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);

    // Input listeners
    document.addEventListener("keydown", e => {
        if (e.code === "Space" || e.code === "ArrowUp") {
            handleInput();
        }
    });

    document.addEventListener("touchstart", e => {
        e.preventDefault();
        handleInput();
    });

    document.addEventListener("click", handleInput);
};

// ================== GAME LOOP ==================
function update() {
    requestAnimationFrame(update);
    if (!gameStarted) return;

    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height);

    // Gravity
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);

    // Draw bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
        dieSound.play().catch(() => {});
    }

    // Pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
            pointSound.play().catch(() => {});
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
            hitSound.play().catch(() => {});
        }
    }

    // Remove off-screen pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    // Score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(Math.floor(score), 5, 45);

    if (gameOver) {
        context.fillStyle = "white";
        context.font = "30px 'Courier New'";
        context.textAlign = "center";
        context.fillText("GAME OVER", board.width / 2, board.height / 2);
        context.font = "20px 'Courier New'";
        context.fillText("Tap or press Space to restart", board.width / 2, board.height / 2 + 40);
    }
}

// ================== HANDLE INPUT ==================
function handleInput() {
    if (!gameStarted) {
        startGame();
        return;
    }

    if (gameOver) {
        resetGame();
        return;
    }

    velocityY = -6 * scaleFactor;
    wingSound.currentTime = 0;
    wingSound.play().catch(() => {});
}

// ================== START GAME ==================
function startGame() {
    gameStarted = true;
    velocityY = -6 * scaleFactor;
    pipeArray = [];
    score = 0;
    gameOver = false;
}

// ================== RESET GAME ==================
function resetGame() {
    bird.y = boardHeight / 2;
    velocityY = 0;
    pipeArray = [];
    score = 0;
    gameOver = false;
    gameStarted = false;

    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    swooshSound.currentTime = 0;
    swooshSound.play().catch(() => {});
}

// ================== PIPES ==================
function placePipes() {
    if (!gameStarted || gameOver) return;

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = board.height / 4;

    pipeArray.push({
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    });

    pipeArray.push({
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    });
}

// ================== COLLISION ==================
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
