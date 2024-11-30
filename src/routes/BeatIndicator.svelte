<script lang="ts">
	import { Oscillator } from '$lib/Oscillator.svelte';

	interface Props {
		oscillator: Oscillator;
	}
	let { oscillator }: Props = $props();

	let position = $derived((oscillator.value + 1) * 25 + 25); // starting position of the ball
</script>

<div class="wrapper">
	<div class="container">
		<div class="target top"></div>
		<div class="target bottom"></div>
		<div class="ball" style="top: {position}%;"></div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: -1;
		width: 100%;
		height: 100dvh;
	}

	.container {
		display: grid;
		align-items: center;
		justify-items: center;
		width: 100%;
		height: 50dvh;
	}

	.target {
		grid-area: 1 / 1 / 2 / 2;
		position: absolute;
		left: 50%;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: transparent;
		border: 4px solid grey;
		transform: translate(-50%, -50%);
	}

	.top {
		top: 25%;
	}

	.bottom {
		top: 75%;
	}

	.ball {
		grid-area: 1 / 1 / 2 / 2;
		position: absolute;
		top: 0;
		left: 50%;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: coral;
		transform: translate(-50%, -50%);
	}
</style>
