<script lang="ts">
	import TicTacToe from './TicTacToe.svelte';

	let gameState: 'inHomeScreen' | 'running' | 'xWon' | 'oWon' | 'draw' | 'missedBeat' =
		$state('inHomeScreen');

	// const audioContext = new AudioContext();
	// const audioElement = document.querySelector('audio');
	// const audioSource = audioContext.createMediaElementSource(audioElement);
	// const analyser = audioContext.createAnalyser();

	const onGameEnd = (result: 'xWon' | 'oWon' | 'draw') => {
		gameState = result;
	};
</script>

<main>
	{#if gameState === 'inHomeScreen'}
		<h1>Tic Tac Tune</h1>
		<button onclick={() => (gameState = 'running')}>Start Game</button>
	{/if}
	{#if gameState === 'running'}
		<TicTacToe {onGameEnd} />
	{/if}
	{#if gameState === 'xWon'}
		<h1>X Won</h1>
		<button onclick={() => (gameState = 'running')}>Restart Game</button>
		<button onclick={() => (gameState = 'inHomeScreen')}>Go Back</button>
	{/if}
	{#if gameState === 'oWon'}
		<h1>O Won</h1>
		<button onclick={() => (gameState = 'running')}>Restart Game</button>
		<button onclick={() => (gameState = 'inHomeScreen')}>Go Back</button>
	{/if}
	{#if gameState === 'draw'}
		<h1>Draw</h1>
		<button onclick={() => (gameState = 'running')}>Restart Game</button>
		<button onclick={() => (gameState = 'inHomeScreen')}>Go Back</button>
	{/if}
	{#if gameState === 'missedBeat'}
		<h1>Missed Beat</h1>
		<button onclick={() => (gameState = 'running')}>Restart Game</button>
		<button onclick={() => (gameState = 'inHomeScreen')}>Go Back</button>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
