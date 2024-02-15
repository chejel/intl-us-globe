<script>
	// Initialize map
	import { onMount, onDestroy } from 'svelte';

	// Packages
	import mapboxgl from 'mapbox-gl';
	import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

	// Stores
	import { map, citiesDataFC } from '$lib/stores.js';

	let mapContainer;

	mapboxgl.accessToken =
		'pk.eyJ1IjoiamVuY2hlIiwiYSI6ImNsZzZ6OWh4ajA0dGczd25wMzRwcmUwZnEifQ.wSe4_SgYEgC-QX-6Clad9w';

	// Set state of sidebar and globe padding

	export let sidebarVisible;

	let globePadding;

	$: if (sidebarVisible) {
		globePadding = { left: 550 };
	} else {
		globePadding = { left: 0 };
	}

	//$: intlCities = $citiesDataFC.features.filter(d => d.intlCities)
	//$: console.log($citiesDataFC?.features.map((d) => d.intlCity));

	onMount(() => {
		// Load map and set store
		map.set(
			new mapboxgl.Map({
				container: mapContainer,
				accessToken: mapboxgl.accessToken,
				style: 'mapbox://styles/jenche/clsmom1ch043k01p5f4gsbq19',
				zoom: 2,
				maxZoom: 5,
				center: [30, 50],
				projection: 'globe'
			})
		);

		// Add zoom controls
		$map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

		$map.on('load', () => {
			// Shift globe based on state of sidebar
			$map?.easeTo({
				padding: globePadding,
				duration: 1000
			});

			// Set atmosphere style
			$map.setFog({});

			// https://docs.mapbox.com/mapbox-gl-js/guides/globe/
			// $map.on('style.load', () => {
			// 	$map.setFog({
			// 		color: 'rgb(186, 210, 235)', // Lower atmosphere
			// 		'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
			// 		'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
			// 		'space-color': 'rgb(11, 11, 25)', // Background color
			// 		'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
			// 	});
			// });

			// https://docs.mapbox.com/style-spec/reference/fog/
			// $map.on('style.load', () => {
			// 	$map.setFog({
			// 		range: [0.8, 8],
			// 		color: '#dc9f9f',
			// 		'horizon-blend': 0.5,
			// 		'high-color': '#245bde',
			// 		'space-color': '#000000',
			// 		'star-intensity': 0.15
			// 	});
			// });

			// Add markers for international cities
			$map.addSource('intlCities', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: $citiesDataFC.features?.map((feature) => feature.intlCity)
				}
			});

			$map.addLayer({
				id: 'intl-layer',
				type: 'circle',
				source: 'intlCities',
				paint: {
					'circle-radius': 4,
					'circle-stroke-width': 2,
					'circle-color': 'red',
					'circle-stroke-color': 'white'
				}
			});

			// Add labels: https://docs.mapbox.com/style-spec/reference/layers/#layout-property
			$map.addLayer({
				id: 'intl-labels',
				type: 'symbol',
				source: 'intlCities',
				layout: {
					'text-field': ['get', 'name'],
					'text-variable-anchor': ['left'],
					'text-radial-offset': 0.5,
					'text-justify': 'auto',
					'text-font': ['Droid Serif Bold']
				},
				paint: {
					'text-color': 'white',
					'text-halo-color': 'black',
					'text-halo-width': 1
				}
			});
		});

		// Get city name from clicking marker
		$map.on('click', 'intl-layer', (e) => {
			//console.log(e.features[0].properties.name);
		});

		// Get city name from clicking label
		$map.on('click', function (e) {
			const features = $map.queryRenderedFeatures(e.point);
			//console.log(features[0].properties.name);
		});
	});

	onDestroy(() => {
		if ($map) {
			$map.remove();
		}
	});

	$: $map?.easeTo({
		padding: globePadding,
		duration: 1000
	});
</script>

<div class="map" bind:this={mapContainer} />

<style>
	.map {
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
	}
</style>
