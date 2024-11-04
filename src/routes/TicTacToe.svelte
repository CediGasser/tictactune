<script lang="ts">
	let board = $state(Array(9).fill(null)); // 3x3 Grid
	let winner: null | 'X' | 'O' = null; //Track Winner
	let turn = 'X'; // Track Players Turn
	let isDraw = false;

	interface Props {
		onGameEnd: (result: 'xWon' | 'oWon' | 'draw') => void;
	}

	let { onGameEnd }: Props = $props();

	function makeMove(index: number) {
		if (board[index] || winner) return;

		board[index] = turn;
		checkWinner();

		if (!winner) {
			turn = turn === 'X' ? 'O' : 'X'; //Switch Turns
		}
	}

	function checkWinner() {
		const winningCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		winningCombos.forEach((combo) => {
			const [a, b, c] = combo;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				winner = board[a];
				onGameEnd(winner === 'X' ? 'xWon' : 'oWon');
			}
		});

		// Check for Draw
		if (!winner && board.every((cell) => cell)) {
			isDraw = true;
			onGameEnd('draw');
		}
	}
</script>

<div>
	<div class="board">
		{#each board as cell, index}
			<button onclick={() => makeMove(index)}>
				{cell}
			</button>
		{/each}
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(3, 100px);
		gap: 10px;
		margin: 20px auto;
	}
	button {
		width: 100px;
		height: 100px;
		font-size: 2em;
	}
</style>
