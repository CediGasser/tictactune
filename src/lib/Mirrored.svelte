<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		middle: Snippet;
	}
	let { children, middle }: Props = $props();
</script>

<div>
	<div class="inverted">
		{@render children?.()}
	</div>
	<div>
		{@render middle?.()}
	</div>
	<div>
		{@render children?.()}
	</div>
</div>

<style>
	.inverted {
		transform: rotate(180deg);
	}
</style>
