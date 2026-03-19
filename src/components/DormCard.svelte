<script>
	export let dorm;
</script>

<div id={dorm.name.replace(/\s+/g, "-")} class="card">
	<div class="banner" style={`background-color: ${dorm.color || "#3b82f6"}`}>
		{dorm.name}
	</div>

	<div class="content">
		<div class="col">
			<div class="title">Pros</div>
			{#each dorm.pros as item}
				<div>• {item}</div>
			{/each}
		</div>

		<div class="col">
			<div class="title">Cons</div>
			{#each dorm.cons as item}
				<div>• {item}</div>
			{/each}
		</div>

		<div class="col">
			<div class="title">Info</div>
			{#each dorm.info as item}
				<div>• {item}</div>
			{/each}
		</div>

		<div class="col">
			<div class="title">Amenities</div>
			{#each dorm.amenities as item}
				<div>• {item}</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.card {
		border: 1px solid black;
		border-radius: 12px;
		overflow: hidden;
		background: white;
	}

	.banner {
		color: white;
		font-weight: 600;
		padding: 8px 12px;
	}

	.content {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		font-size: 0.9rem;
	}

	.col {
		padding: 8px;
		border-top: 1px solid black;
		border-right: 1px solid black;
	}

	.col:last-child {
		border-right: none;
	}

	.title {
		font-weight: 600;
		margin-bottom: 4px;
	}
</style>
