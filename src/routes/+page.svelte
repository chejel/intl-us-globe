<script>
	// Import components
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import HeaderPanel from '$lib/components/HeaderPanel.svelte';
	import AboutPanel from '$lib/components/AboutPanel.svelte';
	import TablePanel from '$lib/components/TablePanel.svelte';
	import HideLinesToggle from '$lib/components/HideLinesToggle.svelte';

	// Import transition
	import { fade } from 'svelte/transition';

	// Set state of sidebar
	let sidebarVisible = true;

	// Import icon components
	import ListIcon from '$lib/components/icons/ListIconWhite.svelte';

	// Load cities data
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { citiesData, citiesDataFC, selectedIntlCity, matchingUSCities } from '$lib/stores.js';

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
							continent: e.continent,
							flag_emoji: e.flag_emoji
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

	let hideLines = false;
</script>

<svelte:head>
	<title>International Place Names in the U.S.</title>
</svelte:head>

<Map bind:sidebarVisible bind:hideLines />

{#if $selectedIntlCity && $matchingUSCities.length > 0}
	<div class="lines-toggle" transition:fade={{ duration: 300 }}>
		<HideLinesToggle bind:hideLines />
	</div>
{/if}

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
	.sidebar-content {
		position: relative;
		max-width: 450px;
		max-height: calc(100svh - 4rem);
		border-radius: 5px;
		background-color: rgba(51, 51, 51, 0.5);
		color: #fff;
		padding: 0;
		top: 0;
		z-index: 1;
		margin: 2rem;
		box-shadow: 0px 0px 24px 3px rgba(255, 255, 255, 0.2);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.sidebar-collapsed {
		position: absolute;
		top: 0;
		margin: 2rem;
		cursor: pointer;
		background-color: transparent;
		border: 0;
	}

	.lines-toggle {
		position: absolute;
		bottom: 145px;
		right: 10px;
		cursor: pointer;
		background-color: transparent;
		border: 0;
	}
</style>
