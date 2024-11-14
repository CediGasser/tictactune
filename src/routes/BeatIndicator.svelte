<script lang="ts">
	import { Oscillator } from '$lib/Oscillator.svelte';

	interface Props {
		oscillator: Oscillator;
	}
	let { oscillator }: Props = $props();

	let position = $derived((oscillator.value + 1) * 50); // starting position of the ball
</script>

<div class="container">
	<div class="ball" style="top: {position}%;"></div>
</div>

<style>
	.container {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		margin-top: 25px;
		margin-left: 0px;
		margin-right: 0px;
		margin-bottom: 25px;
		width: 100%;
		height: calc(100dvh - 2 * 25px);
	}

	.ball {
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
