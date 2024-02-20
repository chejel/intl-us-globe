<script>
	import { selectedIntlCity, citiesData } from '$lib/stores.js';

	// Import components
	import ResetMap from '$lib/components/ResetMap.svelte';
	import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';

	// Table data
	$: filteredData = $citiesData
		.filter((d) => d.intlCity.properties.name === $selectedIntlCity)
		.map((d) => d.usCity.properties)
		.sort((a, b) => a.state.localeCompare(b.state))
		// Add index
		.map((d, i) => ({ ...d, index: i + 1 }));

	// Get country name and flag emoji for headline
	$: selectedCountry = [
		...new Set(
			$citiesData
				.filter((d) => d.intlCity.properties.name === $selectedIntlCity)
				.map((d) => ({
					country: d.intlCity.properties.country,
					flagEmoji: d.intlCity.properties.flag_emoji
				}))
		)
	][0];
</script>

{#if $selectedIntlCity}
	<!-- Back arrow -->
	<ResetMap parentComponent="TablePanel">
		<ArrowLeft />
	</ResetMap>

	<!-- Headline -->
	<div class="headline">
		<span class="intl-city">{$selectedIntlCity}</span>, {selectedCountry.country}
		{selectedCountry.flagEmoji}
		{$citiesData.length > 1 ? 'matches' : 'match'}
		<span class="us-city">{filteredData.length}</span> U.S. {filteredData.length > 1
			? 'municipalities'
			: 'municipality'}
	</div>

	<!-- Table of matching city names, state, Wikipedia link-->
	<div class="table-container">
		<table cellpadding="0" cellspacing="0" border="0">
			<colgroup>
				<col style="width: 20px" />
				<col style="width: auto" />
				<col style="width: 150px" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">City</th>
					<th scope="col">U.S. State</th>
				</tr></thead
			>
			<tbody>
				{#each filteredData as { index, name, state }}
					<tr>
						<td class="index">{index}</td>
						<td class="value" on:click={() => console.log(name)}>{name} </td>
						<td>{state}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.headline {
		font-family: 'Barlow Condensed', sans-serif;
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.intl-city {
		background-color: rgba(var(--intl-city-color), 1);
		padding: 0rem 0.3rem;
		border-radius: 5px;
	}

	.us-city {
		background-color: rgba(var(--us-muni-color), 1);
		padding: 0rem 0.3rem;
		border-radius: 5px;
		color: #333;
		font-weight: 700;
	}

	.table-container {
		overflow: auto;
		padding-right: 0.5rem;
	}

	table {
		width: 100%;
		/* border: 1px solid rgba(246, 253, 195, 0.85); */
		border-radius: 5px;
		padding-right: 0.25rem;
	}

	th {
		text-align: left;
		position: sticky;
		top: 0;
		/* background-color: rgba(var(--us-muni-color), 0.8);
		color: #333; 
		border-bottom: 1.5px solid rgba(246, 253, 195, 0.75); */
		background-color: #040404;
		padding: 0.15rem 0;
	}

	th:first-child {
		border-radius: 3px 0 0 0;
		padding-left: 0.25rem;
		padding-right: 0.5rem;
		text-align: right;
	}

	th:last-child {
		border-radius: 0 3px 0 0;
	}

	td {
		padding: 0.15rem 0;
		border-bottom: 1px solid rgba(246, 253, 195, 0.25);
	}

	/* index numbers */
	tr td:first-child {
		padding-right: 0.5rem;
		color: rgba(var(--us-muni-color), 0.85);
		text-align: right;
	}

	tr:last-child td {
		border-bottom: 1px solid rgba(246, 253, 195, 0.75);
	}
</style>
