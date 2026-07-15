<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		class: className = "",
		children,
		...props
	}: { class?: string; children?: Snippet } & any = $props();
</script>

<kbd
	{...props}
	class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 py-0.5 text-xs font-medium text-ui-text-muted bg-ui-key-surface border border-ui-control-border border-b-2 rounded {className}"
>
	{#if children}
		{@render children()}
	{/if}
</kbd>
