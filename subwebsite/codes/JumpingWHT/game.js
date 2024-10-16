// 获取canvas和上下文
const canvas = document.getElementById('dinoGame');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

// 加载贴图
const dinoImg = new Image();
dinoImg.src = 'dino.png';  // 本地恐龙贴图

const cactusImg = new Image();
cactusImg.src = 'cactus.png';  // 本地仙人掌贴图

const pteroImg = new Image(); // 本地翼龙贴图
pteroImg.src = 'ptero.png'; 

const groundImg = new Image();
groundImg.src = 'ground.png';  // 本地地面贴图

let gameStarted = false;
let gameOver = false;
let score = 0;
let speed = 5;
let isNight = false;

// 恐龙
let dino = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    dy: 0,
    jumpPower: -12,
    gravity: 0.6,
    isJumping: false,
    isDucking: false
};

// 障碍物
let obstacles = [];
let obstacleFrequency = 150;

// 游戏循环
function gameLoop() {
    if (gameStarted && !gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新恐龙位置
        updateDino();

        // 随机生成障碍物
        if (Math.random() < 1 / obstacleFrequency) {
            generateObstacle();
        }
        
        // 更新并绘制障碍物
        updateObstacles();

        // 更新得分和速度
        score++;
        scoreDisplay.textContent = score;

        if (score % 1000 === 0) {
            speed += 0.5; // 提高速度
            obstacleFrequency -= 10; // 增加障碍物频率
        }

        // 昼夜交替
        if (score % 500 === 0) {
            isNight = !isNight;
            document.body.style.backgroundColor = isNight ? '#333' : '#f7f7f7';
        }

        drawGround();
        drawDino();
        requestAnimationFrame(gameLoop);
    }
}

// 启动游戏
function startGame() {
    message.style.display = 'none';
    gameStarted = true;
    gameLoop();
}

// 恐龙跳跃和下蹲
window.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !dino.isJumping) {
        dino.isJumping = true;
        dino.dy = dino.jumpPower;
    }
    if (event.code === 'ArrowDown') {
        dino.isDucking = true;
    }
});

window.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowDown') {
        dino.isDucking = false;
    }
});

// 点击恐龙启动游戏
canvas.addEventListener('click', startGame);

// 更新恐龙状态
function updateDino() {
    if (dino.isJumping) {
        dino.dy += dino.gravity;
        dino.y += dino.dy;

        if (dino.y >= canvas.height - 100) {
            dino.y = canvas.height - 100;
            dino.isJumping = false;
            dino.dy = 0;
        }
    }
    if (dino.isDucking) {
        dino.height = 30;
    } else {
        dino.height = 50;
    }
}

// 障碍物
function generateObstacle() {
    let type = Math.random() > 0.5 ? 'cactus' : 'ptero';
    let obstacle = {
        x: canvas.width,
        y: type === 'cactus' ? canvas.height - 100 : canvas.height - 200,
        width: 50,
        height: 50,
        speed: speed,
        type: type
    };
    obstacles.push(obstacle);
}

function updateObstacles() {
    obstacles.forEach((obstacle, index) => {
        obstacle.x -= obstacle.speed;

        // 移除屏幕外的障碍物
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
        }

        // 绘制障碍物
        drawObstacle(obstacle);

        // 碰撞检测
        if (
            dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y
        ) {
            gameOver = true;
            message.textContent = `游戏结束！总分: ${score}`;
            message.style.display = 'block';
        }
    });
}

// 绘制障碍物
function drawObstacle(obstacle) {
    let img = obstacle.type === 'cactus' ? cactusImg : pteroImg;
    ctx.drawImage(img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function drawGround() {
    ctx.drawImage(groundImg, 0, canvas.height - 50, canvas.width, 50);
}

function drawDino() {
    ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
}

// 重新开始游戏
window.addEventListener('keydown', function (event) {
    if (gameOver && event.code === 'Space') {
        gameOver = false;
        score = 0;
        speed = 5;
        obstacles = [];
        startGame();
    }
});
