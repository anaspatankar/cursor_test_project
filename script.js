class SnakesAndLadders {
    constructor() {
        this.boardSize = 100;
        this.currentPlayer = 1;
        this.positions = {};
        this.gameActive = true;
        this.scores = {};
        this.numPlayers = 2;
        this.playerPawns = ['🔵', '🔴', '🟡', '🟣'];
        
        // Snakes and Ladders positions (from: to)
        this.snakes = {
            16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
        };
        
        this.ladders = {
            1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
        };
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.playerSelection = document.getElementById('player-selection');
        this.gameScreen = document.getElementById('game-screen');
        this.gameBoard = document.getElementById('game-board');
        this.statusElement = document.getElementById('status');
        this.scoreContainer = document.getElementById('score-container');
        this.currentPlayerElement = document.getElementById('current-player');
        this.playerIndicator = document.querySelector('.player-indicator');
        this.dice = document.getElementById('dice');
        this.rollBtn = document.getElementById('roll-btn');
        this.modal = document.getElementById('modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.modalBtn = document.getElementById('modal-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.resetScoreBtn = document.getElementById('reset-score-btn');
        this.backToMenuBtn = document.getElementById('back-to-menu-btn');
        this.pawnsDisplay = document.getElementById('pawns-display');
        
        this.addEventListeners();
        this.showPlayerSelection();
    }
    
    addEventListeners() {
        // Player selection
        document.querySelectorAll('.player-option').forEach(option => {
            option.addEventListener('click', () => {
                this.numPlayers = parseInt(option.dataset.players);
                this.startGame();
            });
        });
        
        // Game controls
        this.rollBtn.addEventListener('click', () => this.rollDice());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScore());
        this.backToMenuBtn.addEventListener('click', () => this.showPlayerSelection());
        this.modalBtn.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    showPlayerSelection() {
        this.playerSelection.style.display = 'block';
        this.gameScreen.style.display = 'none';
    }
    
    startGame() {
        this.playerSelection.style.display = 'none';
        this.gameScreen.style.display = 'block';
        
        // Initialize players
        this.positions = {};
        this.scores = {};
        for (let i = 1; i <= this.numPlayers; i++) {
            this.positions[i] = 1;
            this.scores[i] = 0;
        }
        
        this.currentPlayer = 1;
        this.gameActive = true;
        
        this.createBoard();
        this.updateScoreDisplay();
        this.updatePawnsDisplay();
        this.updateDisplay();
        this.statusElement.textContent = 'Roll the dice to start!';
    }
    
    createBoard() {
        this.gameBoard.innerHTML = '';
        
        for (let i = 100; i >= 1; i--) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = i;
            cell.dataset.position = i;
            
            // Add snake or ladder indicators
            if (this.snakes[i]) {
                cell.classList.add('snake');
            } else if (this.ladders[i]) {
                cell.classList.add('ladder');
            }
            
            this.gameBoard.appendChild(cell);
        }
    }
    
    rollDice() {
        if (!this.gameActive) return;
        
        this.rollBtn.disabled = true;
        this.dice.classList.add('rolling');
        
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6) + 1;
            this.showDiceFace(roll);
            this.movePlayer(roll);
            this.dice.classList.remove('rolling');
            this.rollBtn.disabled = false;
        }, 600);
    }
    
    showDiceFace(number) {
        const diceFace = this.dice.querySelector('.dice-face');
        diceFace.innerHTML = '';
        
        const dots = this.getDiceDots(number);
        dots.forEach(dot => {
            const dotElement = document.createElement('span');
            dotElement.className = 'dot';
            dotElement.style.gridColumn = dot.col;
            dotElement.style.gridRow = dot.row;
            diceFace.appendChild(dotElement);
        });
    }
    
    getDiceDots(number) {
        const dotPositions = {
            1: [{ row: 2, col: 2 }],
            2: [{ row: 1, col: 1 }, { row: 3, col: 3 }],
            3: [{ row: 1, col: 1 }, { row: 2, col: 2 }, { row: 3, col: 3 }],
            4: [{ row: 1, col: 1 }, { row: 1, col: 3 }, { row: 3, col: 1 }, { row: 3, col: 3 }],
            5: [{ row: 1, col: 1 }, { row: 1, col: 3 }, { row: 2, col: 2 }, { row: 3, col: 1 }, { row: 3, col: 3 }],
            6: [{ row: 1, col: 1 }, { row: 1, col: 3 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 1 }, { row: 3, col: 3 }]
        };
        return dotPositions[number] || [];
    }
    
    movePlayer(roll) {
        const player = this.currentPlayer;
        let newPosition = this.positions[player] + roll;
        
        // Check if player won
        if (newPosition === this.boardSize) {
            this.handleWin(player);
            return;
        }
        
        // If overshoot, stay in place
        if (newPosition > this.boardSize) {
            this.statusElement.textContent = `Player ${player} rolled ${roll} but can't move!`;
            this.nextPlayer();
            return;
        }
        
        // Check for snakes with animation
        if (this.snakes[newPosition]) {
            this.statusElement.textContent = `Player ${player} hit a snake! Moving from ${newPosition} to ${this.snakes[newPosition]}`;
            this.animateSnakeBite(newPosition);
            setTimeout(() => {
                newPosition = this.snakes[newPosition];
                this.positions[player] = newPosition;
                this.updateBoard();
                this.nextPlayer();
            }, 1000);
            return;
        }
        
        // Check for ladders
        if (this.ladders[newPosition]) {
            this.statusElement.textContent = `Player ${player} climbed a ladder! Moving from ${newPosition} to ${this.ladders[newPosition]}`;
            this.animateLadderClimb(newPosition);
            setTimeout(() => {
                newPosition = this.ladders[newPosition];
                this.positions[player] = newPosition;
                this.updateBoard();
                if (newPosition === this.boardSize) {
                    this.handleWin(player);
                } else {
                    this.nextPlayer();
                }
            }, 1000);
            return;
        }
        
        this.positions[player] = newPosition;
        this.updateBoard();
        
        if (newPosition === this.boardSize) {
            this.handleWin(player);
        } else {
            this.statusElement.textContent = `Player ${player} moved to position ${newPosition}`;
            this.nextPlayer();
        }
    }
    
    animateSnakeBite(position) {
        const cell = document.querySelector(`[data-position="${position}"]`);
        if (cell) {
            cell.style.animation = 'snakeBite 1s ease-in-out';
            setTimeout(() => {
                cell.style.animation = '';
            }, 1000);
        }
    }
    
    animateLadderClimb(position) {
        const cell = document.querySelector(`[data-position="${position}"]`);
        if (cell) {
            cell.style.animation = 'ladderClimb 1s ease-in-out';
            setTimeout(() => {
                cell.style.animation = '';
            }, 1000);
        }
    }
    
    nextPlayer() {
        this.currentPlayer = this.currentPlayer % this.numPlayers + 1;
        this.updateDisplay();
        this.updatePawnsDisplay();
    }
    
    handleWin(player) {
        this.gameActive = false;
        this.scores[player]++;
        this.updateBoard();
        this.updatePawnsDisplay();
        this.showModal('Game Over!', `Player ${player} wins!`);
        this.updateScoreDisplay();
    }
    
    updateBoard() {
        // Clear previous player positions
        document.querySelectorAll('.cell.player1, .cell.player2, .cell.player3, .cell.player4').forEach(cell => {
            cell.classList.remove('player1', 'player2', 'player3', 'player4');
        });
        
        // Update player positions
        Object.entries(this.positions).forEach(([player, position]) => {
            const cell = document.querySelector(`[data-position="${position}"]`);
            if (cell) {
                cell.classList.add(`player${player}`);
                // Add pawn emoji to cell
                cell.innerHTML = `${position}<br><span style="font-size: 1.2rem;">${this.playerPawns[player-1]}</span>`;
            }
        });
    }
    
    updatePawnsDisplay() {
        this.pawnsDisplay.innerHTML = '';
        
        for (let i = 1; i <= this.numPlayers; i++) {
            const pawnItem = document.createElement('div');
            pawnItem.className = `pawn-item ${i === this.currentPlayer ? 'active' : ''}`;
            pawnItem.innerHTML = `
                <span class="pawn-icon">${this.playerPawns[i-1]}</span>
                <span>Player ${i}: Position ${this.positions[i]}</span>
            `;
            this.pawnsDisplay.appendChild(pawnItem);
        }
    }
    
    showModal(title, message) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.modal.classList.add('show');
    }
    
    closeModal() {
        this.modal.classList.remove('show');
        this.resetGame();
    }
    
    resetGame() {
        for (let i = 1; i <= this.numPlayers; i++) {
            this.positions[i] = 1;
        }
        this.currentPlayer = 1;
        this.gameActive = true;
        this.updateBoard();
        this.updatePawnsDisplay();
        this.updateDisplay();
        this.statusElement.textContent = 'Roll the dice to start!';
    }
    
    resetScore() {
        for (let i = 1; i <= this.numPlayers; i++) {
            this.scores[i] = 0;
        }
        this.updateScoreDisplay();
    }
    
    updateDisplay() {
        this.playerIndicator.textContent = `Player ${this.currentPlayer}`;
        this.playerIndicator.className = `player-indicator ${this.currentPlayer === 1 ? '' : 'active'}`;
    }
    
    updateScoreDisplay() {
        this.scoreContainer.innerHTML = '';
        
        for (let i = 1; i <= this.numPlayers; i++) {
            const scoreItem = document.createElement('div');
            scoreItem.className = `score-item ${i === this.currentPlayer ? 'active' : ''}`;
            scoreItem.innerHTML = `
                <span class="pawn-icon">${this.playerPawns[i-1]}</span>
                <span>Player ${i}: ${this.scores[i]}</span>
            `;
            this.scoreContainer.appendChild(scoreItem);
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes snakeBite {
        0% { transform: scale(1); }
        50% { transform: scale(1.2) rotate(5deg); background: #e74c3c; }
        100% { transform: scale(1); }
    }
    
    @keyframes ladderClimb {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); background: #27ae60; }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SnakesAndLadders();
});
