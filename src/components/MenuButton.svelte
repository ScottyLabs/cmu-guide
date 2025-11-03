<script lang="ts">
	import { Cross2, HamburgerMenu } from "svelte-radix";

	let { isOpen = $bindable(false) } = $props();

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<button
	onclick={toggle}
	class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-600 transition-colors"
	aria-label="Toggle menu"
>
	{#if isOpen}
		<Cross2 class="size-6 dark:invert" />
	{:else}
		<HamburgerMenu class="size-6 dark:invert" />
	{/if}
</button>
