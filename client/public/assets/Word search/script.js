class ModernWordSearch {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.puzzle = [];
        this.words = [];
        this.foundWords = [];
        this.selectedSquares = [];
        this.isSelecting = false;
        this.startSquare = null;
        this.currentWord = '';
        
        this.levels = [
            { words: ['CAT', 'DOG', 'BIRD', 'FISH', 'MOUSE'], size: 8, time: 120 },
            { words: ['APPLE', 'ORANGE', 'BANANA', 'GRAPE', 'MANGO', 'LEMON'], size: 10, time: 180 },
            { words: ['COMPUTER', 'KEYBOARD', 'MONITOR', 'SPEAKER', 'TABLET', 'PHONE', 'CAMERA'], size: 12, time: 240 },
            { words: ['JAVASCRIPT', 'PYTHON', 'DATABASE', 'ALGORITHM', 'FUNCTION', 'VARIABLE', 'OBJECT', 'ARRAY'], size: 14, time: 300 },
            { words: ['ADVENTURE', 'CHALLENGE', 'DISCOVERY', 'EXPLORATION', 'JOURNEY', 'MYSTERY', 'TREASURE', 'VICTORY', 'WISDOM'], size: 16, time: 360 }
        ];

        this.initializeGame();
        this.createParticles();
        this.bindEvents();
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    initializeGame() {
        this.generatePuzzle();
        this.renderPuzzle();
        this.renderWords();
        this.startTimer();
        this.updateDisplay();
    }

    generatePuzzle() {
        const level = this.levels[this.currentLevel - 1];
        this.words = [...level.words];
        const size = level.size;
        
        // Create empty grid
        this.puzzle = Array(size).fill().map(() => Array(size).fill(''));
        
        // Place words randomly
        this.words.forEach(word => {
            this.placeWordInPuzzle(word);
        });
        
        // Fill empty spaces with random letters
        this.fillEmptySpaces();
    }

    placeWordInPuzzle(word) {
        const size = this.puzzle.length;
        const directions = [
            [0, 1],   // horizontal
            [1, 0],   // vertical
            [1, 1],   // diagonal down-right
            [1, -1],  // diagonal down-left
            [0, -1],  // horizontal back
            [-1, 0],  // vertical up
            [-1, -1], // diagonal up-left
            [-1, 1]   // diagonal up-right
        ];

        let placed = false;
        let attempts = 0;
        const maxAttempts = 100;

        while (!placed && attempts < maxAttempts) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startRow = Math.floor(Math.random() * size);
            const startCol = Math.floor(Math.random() * size);

            if (this.canPlaceWord(word, startRow, startCol, direction)) {
                this.placeWord(word, startRow, startCol, direction);
                placed = true;
            }
            attempts++;
        }
    }

    canPlaceWord(word, row, col, direction) {
        const [dRow, dCol] = direction;
        const size = this.puzzle.length;

        for (let i = 0; i < word.length; i++) {
            const newRow = row + dRow * i;
            const newCol = col + dCol * i;

            if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
                return false;
            }

            const currentCell = this.puzzle[newRow][newCol];
            if (currentCell !== '' && currentCell !== word[i]) {
                return false;
            }
        }
        return true;
    }

    placeWord(word, row, col, direction) {
        const [dRow, dCol] = direction;
        for (let i = 0; i < word.length; i++) {
            const newRow = row + dRow * i;
            const newCol = col + dCol * i;
            this.puzzle[newRow][newCol] = word[i];
        }
    }

    fillEmptySpaces() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < this.puzzle.length; i++) {
            for (let j = 0; j < this.puzzle[i].length; j++) {
                if (this.puzzle[i][j] === '') {
                    this.puzzle[i][j] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }

    renderPuzzle() {
        const grid = document.getElementById('puzzleGrid');
        const size = this.puzzle.length;
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        grid.innerHTML = '';

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const square = document.createElement('button');
                square.className = 'puzzle-square';
                square.textContent = this.puzzle[i][j];
                square.dataset.row = i;
                square.dataset.col = j;
                grid.appendChild(square);
            }
        }
    }

    renderWords() {
        const wordsList = document.getElementById('wordsList');
        wordsList.innerHTML = '';
        
        this.words.forEach(word => {
            const wordItem = document.createElement('li');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.dataset.word = word;
            wordsList.appendChild(wordItem);
        });
    }

    bindEvents() {
        const grid = document.getElementById('puzzleGrid');
        
        // Mouse events
        grid.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('puzzle-square')) {
                this.startSelection(e.target);
            }
        });

        grid.addEventListener('mouseover', (e) => {
            if (this.isSelecting && e.target.classList.contains('puzzle-square')) {
                this.continueSelection(e.target);
            }
        });

        grid.addEventListener('mouseup', () => {
            this.endSelection();
        });

        // Touch events
        grid.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('puzzle-square')) {
                this.startSelection(element);
            }
        });

        grid.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.isSelecting) {
                const touch = e.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.classList.contains('puzzle-square')) {
                    this.continueSelection(element);
                }
            }
        });

        grid.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.endSelection();
        });

        // Button events
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('newGameBtn').addEventListener('click', () => this.newGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartLevel());
    }

    startSelection(square) {
        this.isSelecting = true;
        this.startSquare = square;
        this.selectedSquares = [square];
        this.currentWord = square.textContent;
        square.classList.add('selected');
        this.playSound('select');
    }

    continueSelection(square) {
        if (!this.isValidDirection(this.startSquare, square)) return;

        // Clear previous selection
        this.selectedSquares.forEach(sq => sq.classList.remove('selected'));
        
        // Get path from start to current square
        this.selectedSquares = this.getPathBetweenSquares(this.startSquare, square);
        this.currentWord = this.selectedSquares.map(sq => sq.textContent).join('');
        
        // Highlight current selection
        this.selectedSquares.forEach(sq => sq.classList.add('selected'));
    }

    endSelection() {
        if (!this.isSelecting) return;
        
        this.isSelecting = false;
        
        // Check if current word is in the word list
        const foundWord = this.words.find(word => 
            word === this.currentWord || word === this.currentWord.split('').reverse().join('')
        );

        if (foundWord && !this.foundWords.includes(foundWord)) {
            this.foundWords.push(foundWord);
            this.selectedSquares.forEach(sq => sq.classList.add('found'));
            document.querySelector(`[data-word="${foundWord}"]`).classList.add('found');
            this.score += foundWord.length * 10;
            this.playSound('found');
            this.updateDisplay();
            
            if (this.foundWords.length === this.words.length) {
                this.levelComplete();
            }
        } else {
            this.selectedSquares.forEach(sq => sq.classList.remove('selected'));
            this.playSound('wrong');
        }

        this.selectedSquares = [];
        this.currentWord = '';
        this.startSquare = null;
    }

    isValidDirection(start, end) {
        const rowDiff = parseInt(end.dataset.row) - parseInt(start.dataset.row);
        const colDiff = parseInt(end.dataset.col) - parseInt(start.dataset.col);
        
        // Must be in a straight line (horizontal, vertical, or diagonal)
        return rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff);
    }

    getPathBetweenSquares(start, end) {
        const startRow = parseInt(start.dataset.row);
        const startCol = parseInt(start.dataset.col);
        const endRow = parseInt(end.dataset.row);
        const endCol = parseInt(end.dataset.col);
        
        const rowStep = endRow === startRow ? 0 : (endRow > startRow ? 1 : -1);
        const colStep = endCol === startCol ? 0 : (endCol > startCol ? 1 : -1);
        
        const path = [];
        let currentRow = startRow;
        let currentCol = startCol;
        
        while (true) {
            const square = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
            if (square) path.push(square);
            
            if (currentRow === endRow && currentCol === endCol) break;
            
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return path;
    }

    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    levelComplete() {
        clearInterval(this.timerInterval);
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const timeBonus = Math.max(0, (this.levels[this.currentLevel - 1].time - elapsed) * 5);
        this.score += timeBonus;
        
        document.getElementById('completionTime').textContent = 
            `${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}`;
        document.getElementById('completionScore').textContent = this.score;
        document.getElementById('levelComplete').classList.add('show');
        
        this.playSound('victory');
    }

    nextLevel() {
        document.getElementById('levelComplete').classList.remove('show');
        this.currentLevel++;
        if (this.currentLevel > this.levels.length) {
            alert('Congratulations! You completed all levels!');
            this.currentLevel = 1;
            this.score = 0;
        }
        this.foundWords = [];
        this.initializeGame();
    }

    restartLevel() {
        document.getElementById('levelComplete').classList.remove('show');
        this.foundWords = [];
        this.initializeGame();
    }

    newGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.foundWords = [];
        clearInterval(this.timerInterval);
        this.initializeGame();
    }

    showHint() {
        const remainingWords = this.words.filter(word => !this.foundWords.includes(word));
        if (remainingWords.length > 0) {
            const hintWord = remainingWords[0];
            const wordElement = document.querySelector(`[data-word="${hintWord}"]`);
            wordElement.style.background = 'linear-gradient(45deg, #ffd93d, #ff6b6b)';
            setTimeout(() => {
                wordElement.style.background = '';
            }, 2000);
            this.score = Math.max(0, this.score - 20);
            this.updateDisplay();
            this.playSound('hint');
        }
    }

    togglePause() {
        const btn = document.getElementById('pauseBtn');
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            btn.textContent = '▶️ Resume';
        } else {
            this.startTime = Date.now() - (Date.now() - this.startTime);
            this.startTimer();
            btn.textContent = '⏸️ Pause';
        }
    }

    updateDisplay() {
        document.getElementById('currentLevel').textContent = this.currentLevel;
        document.getElementById('score').textContent = this.score;
    }

    playSound(type) {
        // Create audio context and play sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch (type) {
            case 'select':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                break;
            case 'found':
                oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                break;
            case 'wrong':
                oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                break;
            case 'victory':
                oscillator.frequency.setValueAtTime(1600, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                break;
            case 'hint':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                break;
        }
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ModernWordSearch();
});