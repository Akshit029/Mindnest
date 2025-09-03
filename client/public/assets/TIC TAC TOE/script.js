class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.difficulty = 'medium';
        this.scores = { player: 0, ai: 0, draws: 0 };
        
        // Audio elements
        this.moveSound = document.getElementById('moveSound');
        this.gameOverSound = document.getElementById('gameOverSound');
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.celebration = document.getElementById('celebration');
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        this.initializeGame();
        this.setupEventListeners();
        this.startBackgroundMusic();
    }

    startBackgroundMusic() {
        // Start background music with user interaction
        const startMusic = () => {
            this.backgroundMusic.volume = 0.3;
            const playPromise = this.backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Autoplay was prevented, we'll handle it on user interaction
                    document.body.addEventListener('click', function startMusicOnClick() {
                        this.backgroundMusic.play();
                        document.body.removeEventListener('click', startMusicOnClick);
                    }.bind(this), { once: true });
                });
            }
        };

        // Try to start music after a short delay to allow user interaction
        setTimeout(startMusic, 1000);
    }

    showCelebration() {
        this.celebration.style.display = 'flex';
        setTimeout(() => {
            this.celebration.style.display = 'none';
        }, 3000);
    }

    playSound(sound) {
        if (sound) {
            sound.currentTime = 0; // Reset to start
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    }

    initializeGame() {
        this.createBoard();
        this.updateStatus('Your turn!');
    }

    createBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', () => this.handleCellClick(i));
            boardElement.appendChild(cell);
        }
    }

    setupEventListeners() {
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.level;
                this.resetGame();
            });
        });
    }

    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive || this.currentPlayer !== 'X') return;

        this.makeMove(index, 'X');
        
        if (this.gameActive && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    makeMove(index, player) {
        this.board[index] = player;
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add('taken', player.toLowerCase(), 'animate');
        
        // Play move sound
        this.playSound(this.moveSound);
        
        if (this.checkWinner()) {
            this.handleGameEnd();
        } else if (this.board.every(cell => cell !== '')) {
            this.handleDraw();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus(this.currentPlayer === 'X' ? 'Your turn!' : 'AI thinking...');
        }
    }

    makeAIMove() {
        if (!this.gameActive) return;

        let move;
        switch (this.difficulty) {
            case 'easy':
                move = this.getRandomMove();
                break;
            case 'medium':
                move = Math.random() < 0.7 ? this.getBestMove() : this.getRandomMove();
                break;
            case 'hard':
                move = this.getBestMove();
                break;
        }

        if (move !== -1) {
            this.makeMove(move, 'O');
        }
    }

    getRandomMove() {
        const availableMoves = this.board.map((cell, index) => cell === '' ? index : null)
                                        .filter(val => val !== null);
        return availableMoves.length > 0 ? 
               availableMoves[Math.floor(Math.random() * availableMoves.length)] : -1;
    }

    getBestMove() {
        // Check for winning move
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWinner()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }

        // Check for blocking move
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWinner()) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }

        // Take center if available
        if (this.board[4] === '') return 4;

        // Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => this.board[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }

        // Take any available move
        return this.getRandomMove();
    }

    checkWinner() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                // Highlight winning cells
                condition.forEach(index => {
                    document.querySelector(`[data-index="${index}"]`).classList.add('winning');
                });
                return this.board[a];
            }
        }
        return null;
    }

    handleGameEnd() {
        this.gameActive = false;
        this.playSound(this.gameOverSound);
        
        const winner = this.checkWinner();
        if (winner === 'X') {
            this.scores.player++;
            document.getElementById('playerScore').textContent = this.scores.player;
            this.updateStatus('You win! 🎉');
            this.showCelebration();
        } else if (winner === 'O') {
            this.scores.ai++;
            document.getElementById('aiScore').textContent = this.scores.ai;
            this.updateStatus('AI wins! 🤖');
        }
    }

    handleDraw() {
        this.gameActive = false;
        this.scores.draws++;
        document.getElementById('drawScore').textContent = this.scores.draws;
        this.updateStatus("It's a draw!");
        this.playSound(this.gameOverSound);
    }

    updateStatus(message) {
        document.getElementById('status').textContent = message;
    }

    updateScores() {
        document.getElementById('playerScore').textContent = this.scores.player;
        document.getElementById('aiScore').textContent = this.scores.ai;
        document.getElementById('drawScore').textContent = this.scores.draws;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';
        
        // Clear the board
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.updateStatus('Your turn!');
    }
}

// Initialize the game
new TicTacToe();