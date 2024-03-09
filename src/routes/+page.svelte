<script>
	// Import components
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import AboutPanel from '$lib/components/AboutPanel.svelte';
	import TablePanel from '$lib/components/TablePanel.svelte';

	// Set state of sidebar
	let sidebarVisible = true;

	// Import icon components
	import ListIcon from '$lib/components/icons/ListIconWhite.svelte';

	// Load cities data
	import { onMount } from 'svelte';
	import data from '$lib/data/city_matches.json';
	import { citiesData, citiesDataFC, selectedIntlCity } from '$lib/stores.js';

	// Import transition
	import { fade } from 'svelte/transition';

	onMount(async () => {
		citiesData.set(data);

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
							state: e.state_name,
							county: e.county_name
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
</script>

<Map bind:sidebarVisible />

<!-- Sidebar -->
{#if sidebarVisible}
	<div class="sidebar-content" transition:fade={{ duration: 300 }}>
		<Sidebar bind:sidebarVisible>
			<header>
				<h1>International City Names in the U.S.</h1>
			</header>

			{#if $selectedIntlCity}
				<TablePanel />
			{:else}
				<!-- <hr style="margin: 1rem 1rem 0.25rem;}" /> -->
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
	header {
		background-color: rgba(23, 23, 23, 0.75);
		padding: 1rem 1rem 0.25rem;
		border-bottom: 1px solid #514e56;
	}

	h1 {
		font-size: clamp(1.8em, 4vw, 2em);
	}

	.sidebar-content {
		position: relative;
		max-width: 450px;
		max-height: calc(100svh - 2rem);
		border-radius: 5px;
		/* background-color: rgba(51, 51, 51, 0.85); */
		background-color: rgba(23, 23, 23, 0.75);
		top: 0;
		z-index: 1;
		margin: 1rem;
		box-shadow: 0px 0px 24px 3px rgba(255, 255, 255, 0.2);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 2;
	}

	.sidebar-collapsed {
		position: absolute;
		top: 0;
		margin: 1rem;
		cursor: pointer;
		background-color: transparent;
		border: 0;
	}
</style>
