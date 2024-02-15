<script>
	// Import components
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	// Import transition
	import { fade } from 'svelte/transition';

	// Set state of sidebar
	let sidebarVisible = true;

	// Import icon components
	import ListIcon from '$lib/components/icons/ListIconWhite.svelte';

	// Load cities data
	import { onMount } from 'svelte';
	import { csv } from 'd3-fetch';
	import { citiesData, citiesDataFC } from '$lib/stores.js';

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
	<div class="sidebar-container" transition:fade={{ duration: 300 }}>
		<Sidebar bind:sidebarVisible>
			<header>
				<h1>U.S. Cities with International Names</h1>
			</header>
			<main class="panel-body">
				<section class="introduction">
					<p>
						The points on the globe represent major cities with names that match a municipality in
						the U.S., either fully or partially. The names may or may not have a shared history; the
						only relationship to be conveyed here is the similarity in name only. Select a city to
						see the locations and names of the corresponding towns and cities in the U.S.
					</p>
				</section>
			</main>
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
	.sidebar-container {
		position: absolute;
		max-width: 450px;
		max-height: 100%;
		border-radius: 5px;
		background-color: #fff;
		padding: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		z-index: 1;
		margin: 2rem;
	}

	.sidebar-collapsed {
		position: absolute;
		top: 0;
		margin: 2rem;
		cursor: pointer;
		background-color: transparent;
		border: 0;
	}
</style>
