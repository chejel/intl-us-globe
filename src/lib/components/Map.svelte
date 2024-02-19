<script>
	// Initialize map
	import { onMount, onDestroy } from 'svelte';

	// Packages
	import mapboxgl from 'mapbox-gl';
	import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

	// Import components
	import ResetMap from '$lib/components/ResetMap.svelte';

	// Stores
	import { map, citiesDataFC, selectedIntlCity, matchingUSCities } from '$lib/stores.js';

	let mapContainer;
	let initialCenterLng;
	let movedCenterLng;

	mapboxgl.accessToken =
		'pk.eyJ1IjoiamVuY2hlIiwiYSI6ImNsZzZ6OWh4ajA0dGczd25wMzRwcmUwZnEifQ.wSe4_SgYEgC-QX-6Clad9w';

	// Set state of sidebar and globe padding
	export let sidebarVisible;
	let globePadding;

	$: if (sidebarVisible) {
		globePadding = { left: 475 };
	} else {
		globePadding = { left: 0 };
	}

	onMount(() => {
		// Load map and set store
		map.set(
			new mapboxgl.Map({
				container: mapContainer,
				accessToken: mapboxgl.accessToken,
				style: 'mapbox://styles/jenche/clsmom1ch043k01p5f4gsbq19',
				zoom: 2,
				maxZoom: 5,
				center: [50.45, 27.6],
				projection: 'globe'
			})
		);

		// Add zoom controls
		$map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

		$map.on('load', () => {
			// Establish initial center longtitude value
			initialCenterLng = $map?.getCenter().lng;

			// ...to determine when map has been panned/zoomed (i.e. when center longitude value has changed) for setting conditional styling on reset map button
			$map.on('move', () => {
				movedCenterLng = $map?.getCenter().lng;
			});

			// Shift globe based on state of sidebar
			$map.easeTo({
				padding: globePadding,
				duration: 1000
			});

			// Set atmosphere style
			$map.setFog({});

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

			// Add int'l labels: https://docs.mapbox.com/style-spec/reference/layers/#layout-property
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

			// Add markers for matching US cities
			$map.addSource('usCities', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: $citiesDataFC.features?.map((feature) => feature.usCity)
				}
			});

			$map.addLayer({
				id: 'us-layer',
				type: 'circle',
				source: 'usCities',
				paint: {
					'circle-radius': 6,
					'circle-stroke-width': 2,
					'circle-color': 'yellow',
					'circle-stroke-color': 'white'
				}
			});

			// Hide US cities on initial load
			$map.setFilter('us-layer', ['in', 'name', '']);

			// Change cursor ti pointer when hovering over marker
			$map.on('mouseenter', ['intl-layer', 'intl-labels'], () => {
				$map.getCanvas().style.cursor = 'pointer';
			});

			// cursor goes back to default off point
			$map.on('mouseleave', ['intl-layer', 'intl-labels'], () => {
				$map.getCanvas().style.cursor = 'auto';
			});
		});

		// Get city name from clicking marker/label
		$map.on('click', ['intl-layer', 'intl-labels'], (e) => {
			selectedIntlCity.set(e.features[0].properties.name);

			$map.flyTo({
				center: [-95.7, 39],
				essential: true, // "this animation is considered essential with respect to prefers-reduced-motion"
				zoom: 3.75,
				speed: 0.65,
				curve: 1,
				easing(t) {
					return t;
				}
			});
		});

		$map.on('click', ['us-layer'], (e) => {
			console.log(e.features[0].properties.name);
		});
	});

	onDestroy(() => {
		if ($map) {
			$map.remove();
		}
	});

	// Update globe padding depending on state of sidebar
	$: $map?.easeTo({
		padding: globePadding,
		duration: 1000
	});

	// Show US cities that match selected intl city and draw arc
	export let hideLines;
	$: if ($selectedIntlCity) {
		$map.setFilter('us-layer', ['any', ['in', $selectedIntlCity, ['get', 'name']]]);

		// Remove previous arc
		if ($map.getLayer('matchingCities-line')) {
			$map.removeLayer('matchingCities-line');
		}

		if ($map.getSource('matchingCities')) {
			$map.removeSource('matchingCities');
		}

		// Draw arc between intl and us cities
		$map.addSource('matchingCities', {
			type: 'geojson',
			data: arcData()
		});

		function arcData() {
			const intlCityFeature = $citiesDataFC.features?.find(
				(feature) => feature.intlCity.properties.name === $selectedIntlCity
			);

			//if (!intlCityFeature) return null;

			matchingUSCities.set(
				$citiesDataFC.features?.filter((feature) =>
					feature.usCity.properties.name.includes($selectedIntlCity)
				)
			);

			const matchingCityFeatures = $matchingUSCities.map((usCityFeature) => {
				return {
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: [
							intlCityFeature.intlCity.geometry.coordinates,
							usCityFeature.usCity.geometry.coordinates
						]
					}
				};
			});

			return {
				type: 'FeatureCollection',
				features: matchingCityFeatures
			};
		}

		if (!hideLines) {
			$map.addLayer({
				id: 'matchingCities-line',
				type: 'line',
				source: 'matchingCities',
				layout: { 'line-cap': 'round' },
				paint: {
					'line-color': '#007296',
					'line-width': 2.5
				}
			});
		}
	}
</script>

<div class="map" bind:this={mapContainer} />

{#if initialCenterLng !== movedCenterLng}
	<div class="reset-btn-container">
		<ResetMap parentComponent="Map" bind:hideLines>Reset Map</ResetMap>
	</div>
{/if}

<style>
	.map {
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
	}

	.reset-btn-container {
		position: absolute;
		bottom: 100px;
		right: 10px;
	}
</style>
