<script>
	import { map, selectedIntlCity, citiesData } from '$lib/stores.js';

	// Import components
	import ResetMap from '$lib/components/ResetMap.svelte';
	import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';

	$: filteredData = $citiesData
		.filter((d) => d.intlCity.properties.name === $selectedIntlCity)
		.map((d) => d.usCity.properties)
		// Add index
		.map((d, i) => ({ ...d, index: i + 1 }));

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
	{$selectedIntlCity}, {selectedCountry.country}
	{selectedCountry.flagEmoji}
	{$citiesData.length > 1 ? 'matches' : 'match'}
	{filteredData.length} U.S. {filteredData.length > 1 ? 'municipalities' : 'municipality'}

	<!-- Table of matching city names, state, Wikipedia link-->
	<div class="table-container">
		<table>
			<colgroup>
				<col style="width: 50px" />
				<col style="width: auto" />
				<col style="width: 150px" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">City</th>
					<th scope="col">State</th>
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
	.table-container {
		overflow: auto;
	}
	table {
		width: 100%;
	}
	th {
		text-align: left;
	}
</style>
