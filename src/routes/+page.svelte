<script lang="ts">
	import TicTacToe from './TicTacToe.svelte';
	import Soundpacks from '$lib/assets/soundpacks.json';
	import { BeatKeeper } from '$lib/BeatKeeper';
	import { Soundpack } from '$lib/Soundpack';
	import BeatIndicator from './BeatIndicator.svelte';
	import { Oscillator } from '$lib/Oscillator.svelte';
	import Mirrored from '$lib/Mirrored.svelte';
	import Play from 'svelte-lucide/Play.svelte';
	import { trackEvent } from '$lib/umami';

	const startGame = () => {
		gameState = 'running';
		ticTacToeComponent?.reset();
		soundpack.stopAll();
		soundpack.play('track');
		beatKeeper.start();
		osc.start();
	};

	const onMissedBeat = () => {
		gameState = 'missedBeat';
		soundpack.fadeOutSound('track');
		osc.stop();
		trackEvent('Game ended: missedBeat');
	};

	const onGameEnd = (result: 'xWon' | 'oWon' | 'draw') => {
		gameState = result;
		soundpack.fadeOutSound('track');
		beatKeeper.stop();
		osc.stop();
		trackEvent('Game ended: ' + result);
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

	let ticTacToeComponent: TicTacToe | null = $state(null);

	const soundpackConfig = Soundpacks['TicTacFunk'];
	let hitsPerMinute = $derived(soundpackConfig.bpm / soundpackConfig.hitsPerBeat);
	let osc = $derived(new Oscillator(soundpackConfig.beatStart, hitsPerMinute));
	let beatKeeper = $derived(new BeatKeeper(soundpackConfig.beatStart, hitsPerMinute, onMissedBeat));

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
</script>

<main>
	<div>
		<BeatIndicator oscillator={osc} />
	</div>
	{#if gameState !== 'running'}
		<div>
			<Mirrored>
				{#snippet middle()}
					<div class="center padding-block-sm">
						<button class="play-button" onclick={startGame} disabled={loadingSoundpack}>
							<Play strokeWidth="4px" />
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
		</div>
	{/if}
	{#if gameState === 'running'}
		<div>
			<TicTacToe bind:this={ticTacToeComponent} {onGameEnd} {onMove} />
		</div>
	{/if}
</main>

<style>
	main {
		height: 100dvh;
		display: grid;
		align-items: center;
		justify-items: center;
	}

	main > div {
		grid-area: 1 / 1 / 2 / 2;
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
</style>
