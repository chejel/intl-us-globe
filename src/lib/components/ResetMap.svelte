<script>
	import { map, selectedIntlCity } from '$lib/stores.js';
	export let parentComponent;
	export let showLines = false;
</script>

<button
	class:resetBtn-map={parentComponent === 'Map'}
	class:resetBtn-table={parentComponent === 'TablePanel'}
	on:click|stopPropagation={() => {
		$map.flyTo({
			center: [50.45, 27.6],
			essential: true, // "this animation is considered essential with respect to prefers-reduced-motion"
			zoom: 2,
			speed: 1,
			curve: 1
		});

		// If resetting map via back arrow in sidebar, remove match and lines
		if (parentComponent === 'TablePanel') {
			if (!showLines && $map.getLayer('matchingCities-line'))
				$map.removeLayer('matchingCities-line');
			$map.setFilter('us-layer', ['in', 'name', '']);
			$selectedIntlCity = undefined;
		}
	}}><slot /></button
>

<style>
	.resetBtn-map {
		background-color: rgba(243, 185, 95, 0.9);
		border: 1px solid #f5a64c;
		cursor: pointer;
		color: #333;
		padding: 0.45rem 0.75rem;
		border-radius: 2px;
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.resetBtn-table {
		border: 0;
		background-color: transparent;
		display: flex;
		cursor: pointer;
		padding: 0.75rem 0 1.5rem;
	}
</style>
