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
	}

	@media (min-width: fit-content) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
