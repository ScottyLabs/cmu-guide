<script lang="ts">
	import type { Snippet } from "svelte";

	const BASE_CLASSES =
		"p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors";

	let {
		class: className = "",
		children,
		...props
	}: { class?: string; children?: Snippet } & any = $props();
</script>

<button {...props} class="{className} {BASE_CLASSES}">
	{#if children}
		{@render children()}
	{/if}
</button>
