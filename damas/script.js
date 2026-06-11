class CheckersGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.validMoves = [];
        this.initBoard();
        this.renderBoard();
        this.setupEventListeners();
    }

    initBoard() {
        this.board = [];
        for (let row = 0; row < 8; row++) {
            this.board[row] = [];
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    if (row < 3) {
                        this.board[row][col] = { color: 'black', isKing: false };
                    } else if (row > 4) {
                        this.board[row][col] = { color: 'white', isKing: false };
                    } else {
                        this.board[row][col] = null;
                    }
                } else {
                    this.board[row][col] = null;
                }
            }
        }
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (this.selectedPiece && 
                    this.selectedPiece.row === row && 
                    this.selectedPiece.col === col) {
                    cell.classList.add('selected');
                }

                if (this.isValidMoveCell(row, col)) {
                    cell.classList.add('valid-move');
                }

                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.classList.add('piece', piece.color);
                    if (piece.isKing) {
                        pieceElement.classList.add('king');
                    }
                    cell.appendChild(pieceElement);
                }

                boardElement.appendChild(cell);
            }
        }

        document.getElementById('current-player').textContent = 
            this.currentPlayer === 'white' ? 'Blancas' : 'Negras';
        document.getElementById('current-player').style.color = 
            this.currentPlayer === 'white' ? '#d63031' : '#2d3436';
    }

    isValidMoveCell(row, col) {
        return this.validMoves.some(move => move.row === row && move.col === col);
    }

    getValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece || piece.color !== this.currentPlayer) return [];

        const moves = [];
        const directions = piece.isKing ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] :
            piece.color === 'white' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;

            if (this.isOnBoard(newRow, newCol) && this.board[newRow][newCol] === null) {
                moves.push({ row: newRow, col: newCol, isJump: false });
            }

            const jumpRow = row + 2 * dr;
            const jumpCol = col + 2 * dc;

            if (this.isOnBoard(jumpRow, jumpCol) && 
                this.board[jumpRow][jumpCol] === null &&
                this.board[newRow][newCol] && 
                this.board[newRow][newCol].color !== piece.color) {
                moves.push({ row: jumpRow, col: jumpCol, isJump: true, capturedRow: newRow, capturedCol: newCol });
            }
        });

        return moves;
    }

    isOnBoard(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    handleCellClick(row, col) {
        const piece = this.board[row][col];

        if (piece && piece.color === this.currentPlayer) {
            this.selectedPiece = { row, col };
            this.validMoves = this.getValidMoves(row, col);
            this.renderBoard();
        } else if (this.selectedPiece && this.isValidMoveCell(row, col)) {
            this.movePiece(row, col);
        }
    }

    movePiece(toRow, toCol) {
        const move = this.validMoves.find(m => m.row === toRow && m.col === toCol);
        if (!move) return;

        const fromRow = this.selectedPiece.row;
        const fromCol = this.selectedPiece.col;
        const piece = this.board[fromRow][fromCol];

        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;

        if (move.isJump) {
            this.board[move.capturedRow][move.capturedCol] = null;
        }

        if ((piece.color === 'white' && toRow === 0) || 
            (piece.color === 'black' && toRow === 7)) {
            piece.isKing = true;
        }

        this.selectedPiece = null;
        this.validMoves = [];
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        this.renderBoard();
    }

    setupEventListeners() {
        document.getElementById('board').addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (cell) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.handleCellClick(row, col);
            }
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });
    }

    resetGame() {
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.validMoves = [];
        this.initBoard();
        this.renderBoard();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CheckersGame();
});
