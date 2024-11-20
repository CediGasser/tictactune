<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import Seo from '$lib/Seo.svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<Seo
	title="Tic Tac Tune"
	description="Tic Tac Toe but with a twist! Can you win to a beat?"
	keywords="Tic Tac Toe, Game, Fun, Music"
/>

{@render children?.()}
