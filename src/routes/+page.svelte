<script lang="ts">
	import TicTacToe from './TicTacToe.svelte';
	import Soundpacks from '$lib/assets/soundpacks.json';
	import { loadSoundpack, type Soundpack } from '$lib/Soundpack.svelte';

	let gameState: 'inHomeScreen' | 'running' | 'xWon' | 'oWon' | 'draw' | 'missedBeat' =
		$state('inHomeScreen');

	let soundpack: Soundpack;

	const onGameEnd = (result: 'xWon' | 'oWon' | 'draw') => {
		gameState = result;
	};

	const startGame = async () => {
		soundpack = await loadSoundpack(Soundpacks['TicTacFunk']);
		gameState = 'running';
		soundpack.playTrack();
	};
</script>

<main>
	{#if gameState === 'inHomeScreen'}
		<h1>Tic Tac Tune</h1>
		<button onclick={startGame}>Start Game</button>
	{/if}
	{#if gameState === 'running'}
		<TicTacToe {onGameEnd} />
	{/if}
	{#if gameState === 'xWon'}
		<h1>X Won</h1>
		<button onclick={startGame}>Restart Game</button>
		<button onclick={() => (gameState = 'inHomeScreen')}>Go Back</button>
	{/if}
	{#if gameState === 'oWon'}
		<h1>O Won</h1>
		<button onclick={startGame}>Restart Game</button>
		<button onclick={() => (gameState = 'inHomeScreen')}>Go Back</button>
	{/if}
	{#if gameState === 'draw'}
		<h1>Draw</h1>
		<button onclick={startGame}>Restart Game</button>
		<button onclick={() => (gameState = 'inHomeScreen')}>Go Back</button>
	{/if}
	{#if gameState === 'missedBeat'}
		<h1>Missed Beat</h1>
		<button onclick={startGame}>Restart Game</button>
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
