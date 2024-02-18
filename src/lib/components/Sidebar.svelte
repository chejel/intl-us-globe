<script>
	// Import icon components
	import CloseIcon from '$lib/components/icons/CloseCircleBlack.svelte';

	// Set state of sidebar
	export let sidebarVisible;
</script>

<div class="sidebar-container">
	<slot />
	<!-- Close button -->
	<button
		class="close-button"
		aria-label="Close"
		on:click|stopPropagation={() => {
			sidebarVisible = false;
		}}><CloseIcon /></button
	>
</div>

<style>
	.sidebar-container {
		position: relative;
		max-width: 450px;
		max-height: 100%;
		border-radius: 5px;
		background-color: #1f2544;
		color: #fff;
		padding: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		z-index: 1;
		margin: 2rem;
		opacity: 0.9;
		box-shadow: 0px 0px 24px 3px rgba(255, 255, 255, 0.2);
	}

	.close-button {
		position: absolute;
		top: 5px;
		right: 5px;
		background-color: transparent;
		border: 0;
		cursor: pointer;
		z-index: 100;
	}
</style>
