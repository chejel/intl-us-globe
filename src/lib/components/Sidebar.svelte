<script>
	// Import icon components
	import CloseIcon from '$lib/components/icons/CloseCircleBlack.svelte';

	// Set state of sidebar
	export let sidebarVisible;
</script>

<div class="sidebar-content">
	<slot />
</div>

<!-- Close button -->
<button
	class="close-button"
	aria-label="Close"
	on:click|stopPropagation={() => {
		sidebarVisible = false;
	}}><CloseIcon /></button
>

<style>
	.sidebar-content {
		padding: 1.5rem;
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
