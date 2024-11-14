<script lang="ts">
	import TicTacToe from './TicTacToe.svelte';
	import Soundpacks from '$lib/assets/soundpacks.json';
	import { BeatKeeper } from '$lib/BeatKeeper';
	import { Soundpack } from '$lib/Soundpack';
	import BeatIndicator from './BeatIndicator.svelte';
	import { Oscillator } from '$lib/Oscillator.svelte';
	import Mirrored from '$lib/Mirrored.svelte';
	import Play from 'svelte-lucide/Play.svelte';

	const startGame = async () => {
		gameState = 'running';
		soundpack.play('track');
		beatKeeper.start();
		osc.start();
	};

	const onMissedBeat = () => {
		gameState = 'missedBeat';
		soundpack.fadeOutSound('track');
		osc.stop();
	};

	const onGameEnd = (result: 'xWon' | 'oWon' | 'draw') => {
		gameState = result;
		soundpack.fadeOutSound('track');
		beatKeeper.stop();
		osc.stop();
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

	const soundpackConfig = Soundpacks['TicTacFunk'];
	const hitsPerMinute = $derived(soundpackConfig.bpm / soundpackConfig.hitsPerBeat);
	const osc = $derived(new Oscillator(soundpackConfig.beatStart, hitsPerMinute));
	let loadingSoundpack = $state(true);

	let gameState: 'inHomeScreen' | 'running' | 'xWon' | 'oWon' | 'draw' | 'missedBeat' =
		$state('inHomeScreen');

	let soundpack: Soundpack;
	$effect(() => {
		loadingSoundpack = true;
		Soundpack.fromConfig(soundpackConfig).then((sp) => {
			soundpack = sp;
			loadingSoundpack = false;
		});
	});

	let beatKeeper = $derived(new BeatKeeper(soundpackConfig.beatStart, hitsPerMinute, onMissedBeat));
</script>

<main class="center">
	<BeatIndicator oscillator={osc} />
	{#if gameState !== 'running'}
		<Mirrored>
			{#snippet middle()}
				<div class="center padding-block-sm">
					<button class="play-button" onclick={startGame} disabled={loadingSoundpack}>
						<Play />
					</button>
				</div>
			{/snippet}
			<div class="center padding-block-sm">
				{#if gameState === 'inHomeScreen'}
					<h1>Tic Tac Tune</h1>
				{/if}
				{#if gameState === 'xWon'}
					<h1>X Won</h1>
				{/if}
				{#if gameState === 'oWon'}
					<h1>O Won</h1>
				{/if}
				{#if gameState === 'draw'}
					<h1>Draw</h1>
				{/if}
				{#if gameState === 'missedBeat'}
					<h1>Missed Beat</h1>
				{/if}
			</div>
		</Mirrored>
	{/if}
	{#if gameState === 'running'}
		<TicTacToe {onGameEnd} {onMove} />
	{/if}
</main>

<style>
	main {
		height: 100dvh;
	}

	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.padding-block-sm {
		padding: 1rem;
	}

	.play-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		text-align: center;
		transform: translateX(1px);
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
