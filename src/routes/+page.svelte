<script lang="ts">
	import TicTacToe from './TicTacToe.svelte';
	import Soundpacks from '$lib/assets/soundpacks.json';
	import { BeatKeeper } from '$lib/BeatKeeper';
	import { Soundpack } from '$lib/Soundpack';
	import BeatIndicator from './BeatIndicator.svelte';

	const startGame = async () => {
		soundpack = await Soundpack.fromConfig(soundpackConfig);

		gameState = 'running';
		beatKeeper.start();
		soundpack.play('track');
	};

	const onMissedBeat = () => {
		soundpack.fadeOutSound('track');
		gameState = 'missedBeat';
	};

	const onGameEnd = (result: 'xWon' | 'oWon' | 'draw') => {
		soundpack.fadeOutSound('track');
		gameState = result;
		beatKeeper.stop();
	};

	const onMove = (turn: 'X' | 'O') => {
		const diff = beatKeeper.hit();
		console.log('diff', diff);

		if (turn === 'X') {
			soundpack.play('soundX');
		} else {
			soundpack.play('soundO');
		}
	};

	let soundpackConfig = Soundpacks['TicTacFunk'];

	let gameState: 'inHomeScreen' | 'running' | 'xWon' | 'oWon' | 'draw' | 'missedBeat' =
		$state('inHomeScreen');

	let soundpack: Soundpack;
	let beatKeeper = new BeatKeeper(
		soundpackConfig.beatStart,
		soundpackConfig.bpm / soundpackConfig.hitsPerBeat
	);
	beatKeeper.onMissedBeat = onMissedBeat;
</script>

<main>
	<BeatIndicator/>
	{#if gameState === 'inHomeScreen'}
		<h1>Tic Tac Tune</h1>
		<button onclick={startGame}>Start Game</button>
	{/if}
	{#if gameState === 'running'}
		<TicTacToe {onGameEnd} {onMove} />
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
