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
	<div class="arrow-container">
		<ResetMap parentComponent="TablePanel">
			<ArrowLeft />
		</ResetMap>
	</div>

	<!-- Headline -->
	<div class="headline">
		<span class="intl-city">{$selectedIntlCity}</span>
		<!-- , {selectedCountry.country} -->
		{selectedCountry.flagEmoji}
		{$citiesData.length > 1 ? 'matches' : 'match'}
		<span class="us-city"
			><strong>{filteredData.length}</strong> U.S. {filteredData.length > 1
				? 'municipalities'
				: 'municipality'}</span
		>
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
					<th scope="col" style="color: rgba(248, 222, 34, 0.85)">#</th>
					<th scope="col"
						>US City <span style="font-weight: 400; color: #C7C8CC;">(County)</span></th
					>
					<th scope="col">State</th>
				</tr></thead
			>
			<tbody>
				{#each filteredData as { index, name, state, county }}
					<tr>
						<td class="index">{index}</td>
						<td class="value">{name} <span style="color: #B4B4B8">({county})</span></td>
						<td>{state}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.arrow-container {
		background-color: rgba(23, 23, 23, 0.75);
		padding: 0 1rem;
	}

	.headline {
		font-family: 'Barlow Condensed', sans-serif;
		font-size: 1.25rem;
		background-color: rgba(23, 23, 23, 0.75);
		padding: 0 1rem 1.25rem;
	}

	.intl-city {
		background-color: rgba(199, 0, 57, 0.9);
		padding: 0 0.3rem;
		border-radius: 5px;
		font-weight: 600;
	}

	.us-city {
		/* background-color: rgba(11, 96, 127, 1); */
		background-color: rgba(0, 101, 138, 0.9);
		padding: 0 0.3rem;
		border-radius: 5px;
	}

	.table-container {
		overflow: auto;
		padding: 0 1rem 1.5rem 1rem;
		box-shadow: inset 0px 0px 25px rgba(0, 0, 0, 0.75);
	}

	table {
		width: 100%;
		border-radius: 5px;
		/* background-color: rgba(86, 2, 0, 0.5); */
		background-color: rgba(2, 52, 74, 0.5);
	}

	th {
		text-align: left;
		position: sticky;
		top: 0;
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
		padding: 0 0.5rem;
		color: rgba(248, 222, 34, 0.85);
		text-align: right;
	}

	tr:last-child td {
		border-bottom: 1px solid rgba(246, 253, 195, 0.75);
	}
</style>
