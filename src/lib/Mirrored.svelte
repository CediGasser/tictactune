<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<div>
	<div class="inverted">
		{@render children?.()}
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
