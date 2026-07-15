<script lang="ts">
	import { Cross2, HamburgerMenu } from "svelte-radix";

	let { isOpen = $bindable(false) } = $props();

	function toggle() {
		isOpen = !isOpen;
	}
</script>

<button
	onclick={toggle}
	class="md:hidden p-2 rounded-lg hover:bg-ui-control-hover transition-colors"
	aria-label="Toggle menu"
>
	{#if isOpen}
		<Cross2 class="size-6 text-ui-icon" />
	{:else}
		<HamburgerMenu class="size-6 text-ui-icon" />
	{/if}
</button>
