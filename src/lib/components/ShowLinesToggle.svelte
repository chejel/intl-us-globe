<script>
	export let showLines;

	// Stores
	import { matchingUSCities } from '$lib/stores.js';
</script>

<label for="state-toggle" class="toggle">
	<input type="checkbox" id="state-toggle" bind:checked={showLines} />
	<span class="switch"></span>
</label>
<span class="toggle-text">Show {$matchingUSCities.length > 1 ? 'lines' : 'line'}</span>

<style>
	.toggle-text {
		margin-left: 0.2rem;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		color: #fff;
	}

	input[type='checkbox'] {
		visibility: hidden;
		width: 0;
		height: 0;
	}

	.toggle {
		position: relative;
		display: inline-block;
		width: 34px;
		height: 20px;
	}

	.switch {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		border-radius: 20px;
		-webkit-transition: 0.3s;
		transition: 0.3s;
		cursor: pointer;
		border: 1px solid #fff;
	}

	.switch:before {
		position: absolute;
		content: '';
		height: 14px;
		width: 14px;
		top: 2px;
		left: 3px;
		background-color: #fff;
		-webkit-transition: 0.4s;
		transition: 0.3s;
		border-radius: 50%;
	}

	input:checked + .switch {
		background-color: #7752fe; /* #007296; */
	}

	input:checked + .switch:before {
		-webkit-transform: translateX(12px);
		-ms-transform: translateX(12px);
		transform: translateX(12px);
	}
</style>
