// 获取canvas和上下文
const canvas = document.getElementById('dinoGame');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (dino) {
        dino.y = canvas.height - 100;
    }
}
window.addEventListener('resize', resizeCanvas);

const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const mobileJumpBtn = document.getElementById('mobileJumpBtn');
const mobileDuckBtn = document.getElementById('mobileDuckBtn');

// 加载贴图
const dinoImg = new Image();
dinoImg.src = 'dino.png';

const cactusImg = new Image();
cactusImg.src = 'cactus.png';

const pteroImg = new Image();
pteroImg.src = '2s.png'; // 优先使用现存的备用动作图
pteroImg.onerror = () => {
    pteroImg.src = 'cactus.png';
};

const groundImg = new Image();
groundImg.src = 'ground.png';

let gameStarted = false;
let gameOver = false;
let score = 0;
let speed = 6;
let isNight = false;

// 恐龙
let dino = {
    x: 60,
    y: window.innerHeight - 100,
    width: 50,
    height: 50,
    dy: 0,
    jumpPower: -13,
    gravity: 0.65,
    isJumping: false,
    isDucking: false
};
resizeCanvas();

// 障碍物
let obstacles = [];
let obstacleFrequency = 140;

function playSound(type) {
    if (window.VelvetNav && typeof window.VelvetNav.playTone === 'function') {
        if (type === 'jump') window.VelvetNav.playTone(480, 'sine', 0.1);
        if (type === 'hit') window.VelvetNav.playTone(180, 'sawtooth', 0.3);
        if (type === 'milestone') window.VelvetNav.playTone(880, 'square', 0.15);
    }
}

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

        if (score % 500 === 0) {
            speed += 0.5;
            obstacleFrequency = Math.max(70, obstacleFrequency - 10);
            playSound('milestone');
        }

        drawGround();
        drawDino();
        requestAnimationFrame(gameLoop);
    }
}

// 启动游戏
function startGame() {
    if (gameStarted && !gameOver) return;
    gameOver = false;
    score = 0;
    speed = 6;
    obstacles = [];
    message.style.display = 'none';
    gameStarted = true;
    gameLoop();
}

function doJump() {
    if (!gameStarted) {
        startGame();
        return;
    }
    if (gameOver) {
        startGame();
        return;
    }
    if (!dino.isJumping) {
        dino.isJumping = true;
        dino.dy = dino.jumpPower;
        playSound('jump');
    }
}

// 键盘控制
window.addEventListener('keydown', function (event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        doJump();
    }
    if (event.code === 'ArrowDown') {
        event.preventDefault();
        dino.isDucking = true;
    }
});

window.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowDown') {
        dino.isDucking = false;
    }
});

// 点击与触摸启动
if (startBtn) {
    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startGame();
    });
}

canvas.addEventListener('click', () => {
    if (!gameStarted || gameOver) {
        startGame();
    } else {
        doJump();
    }
});

// 移动端按键绑定
if (mobileJumpBtn) {
    mobileJumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        doJump();
    });
}

if (mobileDuckBtn) {
    mobileDuckBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dino.isDucking = true;
    });
    mobileDuckBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        dino.isDucking = false;
    });
}

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
        dino.height = 32;
    } else {
        dino.height = 50;
    }
}

// 障碍物
function generateObstacle() {
    let type = Math.random() > 0.4 ? 'cactus' : 'ptero';
    let obstacle = {
        x: canvas.width,
        y: type === 'cactus' ? canvas.height - 100 : canvas.height - 180,
        width: 48,
        height: 48,
        speed: speed,
        type: type
    };
    obstacles.push(obstacle);
}

function updateObstacles() {
    for (let index = obstacles.length - 1; index >= 0; index--) {
        let obstacle = obstacles[index];
        obstacle.x -= obstacle.speed;

        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            continue;
        }

        drawObstacle(obstacle);

        // 碰撞检测
        const hitboxPadding = 8;
        if (
            dino.x + hitboxPadding < obstacle.x + obstacle.width - hitboxPadding &&
            dino.x + dino.width - hitboxPadding > obstacle.x + hitboxPadding &&
            dino.y + hitboxPadding < obstacle.y + obstacle.height - hitboxPadding &&
            dino.y + dino.height > obstacle.y + hitboxPadding
        ) {
            gameOver = true;
            playSound('hit');
            message.innerHTML = `
                <div class="msg-badge">MISSION FAILED // 逃脱中断</div>
                <div class="msg-title">GAME OVER</div>
                <div class="msg-desc">最高奔跑距离: <strong style="color:var(--phantom-red);font-size:1.4rem;">${score}</strong> 米</div>
                <button class="start-btn" onclick="startGame()">[↺ RETRY ESCAPE]</button>
            `;
            message.style.display = 'block';
            break;
        }
    }
}

function drawObstacle(obstacle) {
    let img = obstacle.type === 'cactus' ? cactusImg : pteroImg;
    if (!img.complete || img.naturalWidth === 0) {
        img = cactusImg;
    }
    if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    } else {
        ctx.fillStyle = '#e60012';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function drawGround() {
    if (groundImg.complete && groundImg.naturalWidth !== 0) {
        ctx.drawImage(groundImg, 0, canvas.height - 50, canvas.width, 50);
    } else {
        ctx.fillStyle = '#333';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    }
}

function drawDino() {
    if (dinoImg.complete && dinoImg.naturalWidth !== 0) {
        ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    } else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    }
}
