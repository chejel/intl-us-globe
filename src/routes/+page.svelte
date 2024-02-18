<script>
	// Import components
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import HeaderPanel from '$lib/components/HeaderPanel.svelte';
	import AboutPanel from '$lib/components/AboutPanel.svelte';
	import TablePanel from '$lib/components/TablePanel.svelte';

	// Import transition
	import { fade } from 'svelte/transition';

	// Set state of sidebar
	let sidebarVisible = true;

	// Import icon components
	import ListIcon from '$lib/components/icons/ListIconWhite.svelte';

	// Load cities data
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { citiesData, citiesDataFC, selectedIntlCity } from '$lib/stores.js';

	//import citiesData from '$lib/data/city_matches.csv';
	onMount(async () => {
		citiesData.set(
			await csv(
				'https://raw.githubusercontent.com/chejel/intl-cities-us/main/data/city_matches.csv'
			)
		);

		citiesData.update((d) => {
			return d.map((e) => {
				return {
					usCity: {
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: [e.us_city_long, e.us_city_lat]
						},
						properties: {
							name: e.us_city,
							state: e.state_name
						}
					},
					intlCity: {
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: [e.city_long, e.city_lat]
						},
						properties: {
							name: e.intl_city,
							country: e.country,
							continent: e.continent
						}
					}
				};
			});
		});

		// convert to feature collection
		citiesDataFC.set({
			type: 'FeatureCollection',
			features: $citiesData // array of geojson pt features
		});
	});
</script>

<svelte:head>
	<title>International Place Names in the U.S.</title>
</svelte:head>

<Map bind:sidebarVisible />

<!-- Sidebar -->
{#if sidebarVisible}
	<div class="sidebar-content" transition:fade={{ duration: 300 }}>
		<Sidebar bind:sidebarVisible>
			<HeaderPanel />
			{#if $selectedIntlCity}
				<TablePanel />
			{:else}
				<AboutPanel />
			{/if}
		</Sidebar>
	</div>
{:else}
	<button
		aria-label="Show sidebar"
		class="sidebar-collapsed"
		on:click|stopPropagation={() => (sidebarVisible = !sidebarVisible)}
	>
		<ListIcon />
	</button>
{/if}

<style>
	.sidebar-collapsed {
		position: absolute;
		top: 0;
		margin: 2rem;
		cursor: pointer;
		background-color: transparent;
		border: 0;
	}
</style>
