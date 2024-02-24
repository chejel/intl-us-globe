<script>
	// Import icon components
	import CloseIcon from '$lib/components/icons/CloseCircleBlack.svelte';

	// Set state of sidebar
	export let sidebarVisible;
</script>

<slot />

<!-- Close button -->
<button
	class="close-button"
	aria-label="Close"
	on:click|stopPropagation={() => {
		sidebarVisible = false;
	}}><CloseIcon /></button
>

<style>
	.close-button {
		position: absolute;
		top: 6px;
		right: 0px;
		background-color: transparent;
		border: 0;
		cursor: pointer;
		z-index: 100;
	}
</style>
