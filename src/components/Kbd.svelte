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
	class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 py-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-600 border border-zinc-200 dark:border-zinc-500 border-b-2 rounded {className}"
>
	{#if children}
		{@render children()}
	{/if}
</kbd>
