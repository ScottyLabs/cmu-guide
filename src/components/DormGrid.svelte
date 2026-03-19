<script>
	import DormCard from "./DormCard.svelte";
	export let dorms = [];
</script>

<div class="grid">
	{#each dorms as dorm}
		<DormCard {dorm} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr;
	}
</style>
