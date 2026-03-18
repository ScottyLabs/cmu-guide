<div class="header">
	<div class="section">
		<div>
			All dorms come with laundry facilities. Prices are per year.
			Measurements in feet.
		</div>
		<div>Unlabeled prices are for traditional doubles.</div>
		<a
			href="https://www.cmu.edu/housing/our-communities/first-year/index.html"
			target="_blank"
		>
			CMU Housing Info
		</a>
	</div>

	<div class="section">
		<div>
			Capacity means total # of beds — some may be taken by upperclassmen
			if noted.
		</div>
		<div>Default is freshmen only.</div>
		<div class="bold">HOUSING PRICES AND CAPACITIES, 2026/2027</div>
	</div>

	<div class="section">
		<div>
			Colors are used for Carnegie Cup during O-Week (not too important).
		</div>
		<div>All communal bathrooms are staff-cleaned.</div>
	</div>
</div>

<style>
	.header {
		display: grid;
		border: 1px solid black;
		margin-bottom: 24px;
		font-size: 0.9rem;
	}

	.section {
		padding: 12px;
		border-bottom: 1px solid black;
	}

	.section:last-child {
		border-bottom: none;
	}

	.bold {
		font-weight: 600;
		margin-top: 6px;
	}

	a {
		color: blue;
		text-decoration: underline;
	}

	@media (min-width: 768px) {
		.header {
			grid-template-columns: repeat(3, 1fr);
		}

		.section {
			border-bottom: none;
			border-right: 1px solid black;
		}

		.section:last-child {
			border-right: none;
		}
	}
</style>
