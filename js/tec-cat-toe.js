(
    () => {
      //initial funciton
    function init () {
      const DOM = {
        $currentPlayer: document.querySelector('.js-current-player'),
        $board: document.querySelector('.js-board'),
        $resetButton: document.querySelector('.js-reset'),
      };
      const SIZE = 3;

      function initialState() {
        return {
          boardModel: Array(SIZE).fill(null).map(_ => Array(SIZE).fill(null)),
          players: ['X', 'O'],
          currentPlayer: 0,
          gameEnded: false,
          turn: 0,
        };
      }
      let state = initialState();

      function renderBoard() {
        DOM.$currentPlayer.textContent = state.players[state.currentPlayer];
        // Assuming SIZE > 0.
        DOM.$board.innerHTML = '';
        for (let i = 0; i < SIZE; i++) {
          const $row = document.createElement('div');
          $row.classList.add('board-row');
          for (let j = 0; j < SIZE; j++) {
            const $cell = document.createElement('div');
            $cell.classList.add('board-cell');
            $cell.setAttribute('data-i', i);
            $cell.setAttribute('data-j', j);
            const $content  = document.createElement('span');
            $content.classList.add('content');
            $content.textContent = state.boardModel[i][j];
            $cell.appendChild($content);
            $row.appendChild($cell);
          }
          DOM.$board.appendChild($row);
        }
      }

// check who's the winner, check 4 directions(horizontal,vertical,diagonal South-East,diagonal North-East. )
      function checkWinning(board, player) {
        // Check horizontal.
        for (let i = 0; i < SIZE; i++) {
          if (board[i].every(cell => cell === player)) {
            return true;
          }
        }

        // Check vertical.
        for (let j = 0; j < SIZE; j++) {
          let verticalAllPlayer = true;
          for (let i = 0; i < SIZE; i++) {
            if (board[i][j] !== player) {
              verticalAllPlayer = false;
              break;
            }
          }
          if (verticalAllPlayer) {
            return verticalAllPlayer;
          }
        }

        // Check diagonal South-East.
        let diagonalAllPlayer = true;
        for (let i = 0; i < SIZE; i++) {
          if (board[i][i] !== player) {
            diagonalAllPlayer = false;
            break;
          }
        }
        if (diagonalAllPlayer) {
          return diagonalAllPlayer;
        }

        // Check diagonal North-East.
        diagonalAllPlayer = true;
        for (let i = SIZE - 1, j = 0; i >= 0; i--, j++) {
          if (board[i][j] !== player) {
            diagonalAllPlayer = false;
            break;
          }
        }
        if (diagonalAllPlayer) {
          return diagonalAllPlayer;
        }

        return false;
      }

      // event listener function
      function attachEventListeners() {
        DOM.$board.addEventListener('click', (event) => {
          if (state.gameEnded) {
            return;
          }
          if (!event.target.classList.contains('board-cell')) {
            return;
          }
          const $cell = event.target;
          const i = parseInt($cell.getAttribute('data-i'), 10);
          const j = parseInt($cell.getAttribute('data-j'), 10);
          if (state.boardModel[i][j] !== null) {
            alert('Cell has already been taken!');
            return;
          }
          const player = state.players[state.currentPlayer];
          state.boardModel[i][j] = player;
          const winningMove = checkWinning(state.boardModel, player);
          state.turn++;
          if (!winningMove) {
            state.currentPlayer = (state.currentPlayer + 1) % 2;
            renderBoard();
            if (state.turn === SIZE * SIZE) {
              alert('It\'s a draw!');
            }
          } else {
            renderBoard();
            state.gameEnded = true;
            alert(`Player ${player} wins!`);
          }
        });

        DOM.$resetButton.addEventListener('click', () => {
          if (confirm('Start a new game?')) {
            state = initialState();
            renderBoard();
          }
        });
      }

      renderBoard();
      attachEventListeners();
    }

    document.addEventListener('DOMContentLoaded', init);
  }
)
();