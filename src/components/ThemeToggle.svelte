<script lang="ts">
	import Button from "@/components/Button.svelte";
	import { Sun, Moon } from "svelte-radix";

	function onClick() {
		const isDark = document.documentElement.classList.toggle("dark");
		localStorage.theme = isDark ? "dark" : "light";
	}
</script>

<Button onclick={onClick} class="relative">
	<Sun
		class="size-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="size-6 dark:invert absolute inset-0 m-auto transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
