<script lang="ts">
	import Circle from 'svelte-lucide/Circle.svelte';
	import X from 'svelte-lucide/X.svelte';
	import { fade } from 'svelte/transition';

	let board = $state(Array(9).fill(null)); // 3x3 Grid
	let winner: null | 'X' | 'O' = null; //Track Winner
	let turn: 'X' | 'O' = 'X'; // Track Players Turn
	let isDraw = false;

	interface Props {
		onGameEnd: (result: 'xWon' | 'oWon' | 'draw') => void;
		onMove: (turn: 'X' | 'O') => void;
	}
	let { onGameEnd, onMove }: Props = $props();

	function makeMove(index: number) {
		if (board[index] || winner) return;

		board[index] = turn;
		onMove(turn);
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

<div transition:fade class="glass-morphism">
	<div class="board">
		{#each board as cell, index}
			<button onmousedown={() => makeMove(index)}>
				{#if cell === 'X'}
					<X size="50" />
				{:else if cell === 'O'}
					<Circle size="50" />
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(3, 100px);
		gap: 0;
	}

	.glass-morphism {
		/* From https://css.glass */
		background: rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 1rem;
	}

	button {
		width: 100px;
		height: 100px;
		font-size: 2em;
		background: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;

		--innerBorder: 1px solid rgba(0, 0, 0, 0.3);
	}

	button:nth-child(-n + 3) {
		border-bottom: var(--innerBorder);
	}

	button:nth-child(3n + 1) {
		border-right: var(--innerBorder);
	}

	button:nth-child(3n) {
		border-left: var(--innerBorder);
	}

	button:nth-child(n + 7) {
		border-top: var(--innerBorder);
	}
</style>
