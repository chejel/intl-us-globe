<script>
	import { map } from '$lib/stores.js';
</script>

<button
	class="reset-btn"
	style="background-color: #F3B95F"
	on:click|stopPropagation={() =>
		$map.flyTo({
			center: [50.45, 27.6],
			essential: true, // "this animation is considered essential with respect to prefers-reduced-motion"
			zoom: 2,
			speed: 0.5,
			curve: 1,
			easing(t) {
				return t;
			}
		})}>Reset Map</button
>

<style>
	.reset-btn {
		/* background-color: #f4f4f4; */
		border: 0;
		cursor: pointer;
		color: #333;
		padding: 0.45rem 0.75rem;
		border-radius: 2px;
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
	}
</style>
