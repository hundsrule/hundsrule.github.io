(function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const highScoreEl = document.getElementById('highScore');
    const overlayEl = document.getElementById('overlay');
    const overlayTitleEl = document.getElementById('overlayTitle');
    const overlayHintEl = document.getElementById('overlayHint');

    const GRID = 20;
    const CELL = canvas.width / GRID;
    const STORAGE_KEY = 'hongteSnakeHighScore';

    let snake;
    let direction;
    let nextDirection;
    let food;
    let score;
    let highScore;
    let running;
    let paused;
    let tickTimer;
    let tickInterval;

    function loadHighScore() {
        return Number(localStorage.getItem(STORAGE_KEY) || 0);
    }

    function saveHighScore(value) {
        localStorage.setItem(STORAGE_KEY, String(value));
    }

    function randomFood() {
        let point;
        do {
            point = {
                x: Math.floor(Math.random() * GRID),
                y: Math.floor(Math.random() * GRID)
            };
        } while (snake.some(segment => segment.x === point.x && segment.y === point.y));
        return point;
    }

    function resetGame() {
        snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        direction = { x: 1, y: 0 };
        nextDirection = { x: 1, y: 0 };
        food = randomFood();
        score = 0;
        tickInterval = 130;
        scoreEl.textContent = score;
        highScoreEl.textContent = highScore;
    }

    function showOverlay(title, hint) {
        overlayTitleEl.textContent = title;
        overlayHintEl.textContent = hint;
        overlayEl.classList.remove('hidden');
    }

    function hideOverlay() {
        overlayEl.classList.add('hidden');
    }

    function setDirection(x, y) {
        if (direction.x === -x && direction.y === -y) return;
        nextDirection = { x, y };
    }

    function update() {
        direction = nextDirection;
        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
            endGame();
            return;
        }

        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            endGame();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreEl.textContent = score;
            if (score > highScore) {
                highScore = score;
                highScoreEl.textContent = highScore;
                saveHighScore(highScore);
            }
            food = randomFood();
            tickInterval = Math.max(60, tickInterval - 2);
            restartTickTimer();
        } else {
            snake.pop();
        }
    }

    function drawCell(x, y, color, radius) {
        const padding = 1;
        const size = CELL - padding * 2;
        const px = x * CELL + padding;
        const py = y * CELL + padding;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(px, py, size, size, radius);
        ctx.fill();
    }

    function draw() {
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.width);

        for (let x = 0; x < GRID; x++) {
            for (let y = 0; y < GRID; y++) {
                if ((x + y) % 2 === 0) {
                    ctx.fillStyle = 'rgba(255,255,255,0.02)';
                    ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
                }
            }
        }

        drawCell(food.x, food.y, '#F2F2F2', 8);

        snake.forEach((segment, index) => {
            const isHead = index === 0;
            drawCell(segment.x, segment.y, isHead ? '#E60012' : '#b8000e', isHead ? 6 : 4);
        });

        if (snake.length > 0) {
            const head = snake[0];
            const cx = head.x * CELL + CELL / 2;
            const cy = head.y * CELL + CELL / 2;
            const eyeOffset = 4;
            ctx.fillStyle = '#fff';
            if (direction.x === 1) {
                ctx.fillRect(cx + 2, cy - eyeOffset, 3, 3);
                ctx.fillRect(cx + 2, cy + eyeOffset - 3, 3, 3);
            } else if (direction.x === -1) {
                ctx.fillRect(cx - 5, cy - eyeOffset, 3, 3);
                ctx.fillRect(cx - 5, cy + eyeOffset - 3, 3, 3);
            } else if (direction.y === -1) {
                ctx.fillRect(cx - eyeOffset, cy - 5, 3, 3);
                ctx.fillRect(cx + eyeOffset - 3, cy - 5, 3, 3);
            } else {
                ctx.fillRect(cx - eyeOffset, cy + 2, 3, 3);
                ctx.fillRect(cx + eyeOffset - 3, cy + 2, 3, 3);
            }
        }
    }

    function tick() {
        if (!running || paused) return;
        update();
        draw();
    }

    function restartTickTimer() {
        clearInterval(tickTimer);
        tickTimer = setInterval(tick, tickInterval);
    }

    function startGame() {
        resetGame();
        running = true;
        paused = false;
        hideOverlay();
        draw();
        restartTickTimer();
    }

    function endGame() {
        running = false;
        paused = false;
        clearInterval(tickTimer);
        showOverlay('游戏结束', `得分 ${score} · 按空格或点击重新开始`);
    }

    function togglePause() {
        if (!running) return;
        paused = !paused;
        if (paused) {
            showOverlay('已暂停', '按 P 或空格继续');
        } else {
            hideOverlay();
        }
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                event.preventDefault();
                setDirection(0, -1);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                event.preventDefault();
                setDirection(0, 1);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                event.preventDefault();
                setDirection(-1, 0);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                event.preventDefault();
                setDirection(1, 0);
                break;
            case ' ':
                event.preventDefault();
                if (!running) startGame();
                else if (paused) {
                    paused = false;
                    hideOverlay();
                } else togglePause();
                break;
            case 'p':
            case 'P':
                event.preventDefault();
                togglePause();
                break;
            default:
                break;
        }
    });

    document.querySelectorAll('[data-dir]').forEach(button => {
        button.addEventListener('click', () => {
            const dir = button.dataset.dir;
            if (dir === 'up') setDirection(0, -1);
            if (dir === 'down') setDirection(0, 1);
            if (dir === 'left') setDirection(-1, 0);
            if (dir === 'right') setDirection(1, 0);
            if (!running) startGame();
        });
    });

    document.getElementById('startBtn').addEventListener('click', startGame);
    overlayEl.addEventListener('click', () => {
        if (!running) startGame();
        else if (paused) {
            paused = false;
            hideOverlay();
        }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    canvas.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: true });

    canvas.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (absX < 24 && absY < 24) {
            if (!running) startGame();
            else if (paused) {
                paused = false;
                hideOverlay();
            }
            return;
        }

        if (absX > absY) {
            setDirection(dx > 0 ? 1 : -1, 0);
        } else {
            setDirection(0, dy > 0 ? 1 : -1);
        }

        if (!running) startGame();
    }, { passive: true });

    highScore = loadHighScore();
    highScoreEl.textContent = highScore;
    resetGame();
    draw();
    showOverlay('贪吃蛇', '方向键 / WASD 移动 · 空格开始');
})();
