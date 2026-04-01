<script lang="ts">
	import type { Snippet } from "svelte";

	const BASE_CLASSES =
		"p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors";

	let {
		class: className = "",
		children,
		onclick,
		...props
	}: {
		class?: string;
		children?: Snippet;
		onclick?: (event: MouseEvent) => void;
	} & any = $props();
</script>

<button {...props} {onclick} class="{className} {BASE_CLASSES}">
	{#if children}
		{@render children()}
	{/if}
</button>
